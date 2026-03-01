import User from '../../../models/User';
import Customer from '../../../models/Customer';
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

  const { id } = await readBody(event);
  if (!id) throw createError({ statusCode: 400, statusMessage: "User ID required" });

  // RULE: User should not be able to delete themselves
  if (id === payload.id) {
    throw createError({ statusCode: 403, statusMessage: "Forbidden: You cannot delete your own account" });
  }

  await connectToDatabase();

  try {
    const targetUser = await User.findById(id);
    if (!targetUser) throw createError({ statusCode: 404, statusMessage: "User not found" });

    // RULE: Only Master can delete other Admins
    if (targetUser.isAdmin && !payload.isMaster) {
      throw createError({ statusCode: 403, statusMessage: "Forbidden: Only Master Admin can delete other Admins" });
    }

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) throw createError({ statusCode: 404, statusMessage: "User not found" });

    // ALSO delete all customers associated with this establishment
    await Customer.deleteMany({ establishmentId: id });

    return { success: true, message: "User and associated customers deleted permanently" };
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});
