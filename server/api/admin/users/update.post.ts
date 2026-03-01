import User from '../../../models/User';
import { verifyToken } from '../../../utils/auth';
import { connectToDatabase } from '../../../utils/mongodb';

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

    // Automatically reset registration_denied if requested_plan is updated to something different than current plan
    if (updates.requested_plan !== undefined && updates.requested_plan !== targetUser.plan) {
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

    // Update other fields
    Object.keys(updates).forEach(key => {
      targetUser[key] = updates[key];
    });

    const updatedUser = await targetUser.save();

    return { success: true, user: updatedUser };
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});
