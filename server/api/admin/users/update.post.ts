import User from '../../../models/User';
import { verifyToken } from '../../../utils/auth';
import { connectToDatabase } from '../../../utils/mongodb';
import { sendUserEmail, accountActivatedEmail } from '../../../utils/emails';

export default defineEventHandler(async (event) => {
  const cookieName = process.env.NUXT_COOKIE_NAME || "__session";
  const token = getCookie(event, cookieName);

  if (!token) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });

  const payload = await verifyToken(token);
  if (!payload || !payload.isAdmin) {
    throw createError({ statusCode: 403, statusMessage: "Forbidden: Admin access required" });
  }

  const { id, updates } = await readBody(event);
  if (!id || !updates) throw createError({ statusCode: 400, statusMessage: "ID and updates required" });

  await connectToDatabase();

  try {
    const targetUser = await User.findById(id);
    if (!targetUser) throw createError({ statusCode: 404, statusMessage: "User not found" });

    // HIERARCHY RULES:
    // 1. Only Master can update other Admins.
    // 2. Admins cannot update other Admins.
    // 3. Admin can update themselves (but not their isAdmin/isMaster status).
    
    const isTargetAdmin = !!targetUser.isAdmin;
    const isUpdaterMaster = !!payload.isMaster;
    const isUpdaterSelf = payload.id === id;

    if (isTargetAdmin && !isUpdaterMaster && !isUpdaterSelf) {
      throw createError({ statusCode: 403, statusMessage: "Forbidden: Only Master Admin can update other Admins" });
    }

    // Protection: Only Master can change admin/master status
    if (!isUpdaterMaster) {
      delete updates.isAdmin;
      delete updates.isMaster;
    }

    // Never allow immutable / derived keys to be written back
    ["_id", "id", "__v", "createdAt", "updatedAt", "customers", "resetPasswordToken", "resetPasswordExpires"].forEach(
      (key) => delete updates[key]
    );

    // Automatically reset registration_denied when a NEW plan request is being set
    if (updates.requested_plan !== undefined && updates.requested_plan !== targetUser.requested_plan) {
      updates.registration_denied = false;
    }

    // Password Update Logic with Hierarchy Rules:
    // 1. Master can change any password.
    // 2. Admin can change establishment password or their own.
    // 3. Admin CANNOT change Master password.
    if (updates.password) {
      const isTargetMaster = !!targetUser.isMaster;
      
      if (isTargetMaster && !isUpdaterMaster) {
        throw createError({ statusCode: 403, statusMessage: "Forbidden: Only Master can change Master password" });
      }

      // Set the password on the document to trigger pre-save hashing
      targetUser.password = updates.password;
      delete updates.password; // Remove from updates to avoid overwriting with plain text via findByIdAndUpdate later if we were still using it
    }

    // Detect Activation (Paid false -> true)
    const isActivating = updates.paid === true && targetUser.paid === false && !targetUser.isAdmin;

    // Update other fields
    Object.keys(updates).forEach(key => {
      targetUser[key] = updates[key];
    });

    const updatedUser = await targetUser.save();

    // Send Activation Email if needed
    if (isActivating) {
      sendUserEmail(updatedUser.email, "Your PERF Account is Active!", accountActivatedEmail(updatedUser));
    }

    const obj = updatedUser.toObject();
    const { password, resetPasswordToken, resetPasswordExpires, ...rest } = obj;
    return { success: true, user: { ...rest, id: obj._id.toString() } };
  } catch (err: any) {
    throw createError({ statusCode: err.statusCode || 500, statusMessage: err.statusMessage || err.message });
  }
});
