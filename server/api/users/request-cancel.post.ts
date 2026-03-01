import User from '../../models/User';
import { verifyToken } from '../../utils/auth';
import { connectToDatabase } from '../../utils/mongodb';
import { sendAdminNotification, sendUserEmail, genericUserEmail } from '../../utils/emails';

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
    const updatedUser = await User.findOneAndUpdate(
      { email: payload.email.toLowerCase() },
      { $set: { requested_cancel: true } },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedUser) {
      throw createError({ statusCode: 404, statusMessage: "User not found" });
    }

    // Notify Admin
    sendAdminNotification(
      "Cancellation Request Received", 
      `A user has requested to cancel their subscription: ${updatedUser.email}`
    );

    // Notify User
    sendUserEmail(
      updatedUser.email,
      "PERF - Cancellation Request Received",
      genericUserEmail(
        updatedUser,
        "Cancellation Request Received",
        "We have received your request to cancel your subscription. Our team will process it and contact you if any further information is needed. Your access will remain active until the end of your current billing period."
      )
    );

    return {
      success: true,
      message: "Cancellation request received",
      requested_cancel: updatedUser.requested_cancel
    };
  } catch (err: any) {
    console.error("Cancel Request API Error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
