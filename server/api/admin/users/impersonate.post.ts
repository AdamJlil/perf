import User from '../../../models/User';
import { verifyToken, createToken } from '../../../utils/auth';
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

  await connectToDatabase();

  try {
    const targetUser = await User.findById(id);
    if (!targetUser) throw createError({ statusCode: 404, statusMessage: "User not found" });

    // HIERARCHY PROTECTION:
    // 1. No one can impersonate an ADMIN or MASTER.
    if (targetUser.isAdmin) {
      throw createError({ statusCode: 403, statusMessage: "Forbidden: Admin accounts cannot be impersonated" });
    }

    // 2. Only MASTER can impersonate Establishments. System Admin cannot.
    if (!payload.isMaster) {
      throw createError({ statusCode: 403, statusMessage: "Forbidden: Only Master Admin can impersonate accounts" });
    }

    // Generate a NEW token for the target user
    // We set a shorter expiry for impersonation (e.g., 2 hours)
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const impersonationToken = await createToken({
      id: targetUser._id.toString(),
      email: targetUser.email,
      isAdmin: !!targetUser.isAdmin,
      isMaster: !!targetUser.isMaster,
      isImpersonated: true // Flag to track this session
    }, expiresAt);

    // Stash the admin's own token so they can return to the console afterwards
    setCookie(event, "__admin_return", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

    // Overwrite the session cookie
    setCookie(event, cookieName, impersonationToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

    return { 
      success: true, 
      redirect: targetUser.isAdmin ? '/admin' : '/establishment/manage-customers' 
    };
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});
