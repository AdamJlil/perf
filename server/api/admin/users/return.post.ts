import { verifyToken } from '../../../utils/auth';

// Ends an impersonation session: restores the stashed admin token.
export default defineEventHandler(async (event) => {
  const cookieName = process.env.NUXT_COOKIE_NAME || "__session";

  const adminToken = getCookie(event, "__admin_return");
  if (!adminToken) {
    throw createError({ statusCode: 400, statusMessage: "No admin session to return to" });
  }

  const adminPayload = await verifyToken(adminToken);
  if (!adminPayload || !adminPayload.isAdmin) {
    deleteCookie(event, "__admin_return");
    throw createError({ statusCode: 403, statusMessage: "Stored admin session is invalid or expired" });
  }

  // Restore the admin session and clear the stash
  setCookie(event, cookieName, adminToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  deleteCookie(event, "__admin_return");

  return { success: true, redirect: "/admin" };
});
