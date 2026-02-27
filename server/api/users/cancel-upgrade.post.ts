import User from '../../models/User';
import { verifyToken } from '../../utils/auth';
import { connectToDatabase } from '../../utils/mongodb';
import { sendAdminNotification, upgradeCancelEmail } from '../../utils/emails';

export default defineEventHandler(async (event) => {
  const cookieName = process.env.NUXT_COOKIE_NAME || "__session";
  const token = getCookie(event, cookieName);

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const payload = await verifyToken(token);
  if (!payload || !payload.email) {
    throw createError({ statusCode: 401, statusMessage: "Invalid session" });
  }

  await connectToDatabase();

  try {
    // Get user first to know what plan they were cancelling
    const user = await User.findOne({ email: payload.email.toLowerCase() });
    const cancelledPlan = user?.requested_plan || "Unknown Plan";

    const updatedUser = await User.findOneAndUpdate(
      { email: payload.email.toLowerCase() },
      { $set: { requested_plan: null } },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedUser) {
      throw createError({ statusCode: 404, statusMessage: "User not found" });
    }

    // Notify Admin
    sendAdminNotification("Upgrade Request Withdrawn", upgradeCancelEmail(updatedUser, cancelledPlan));

    return {
      success: true,
      message: "Upgrade request cancelled",
      requested_plan: updatedUser.requested_plan
    };
  } catch (err: any) {
    console.error("Cancel Upgrade API Error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
