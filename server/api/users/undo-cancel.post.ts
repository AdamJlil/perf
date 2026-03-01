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
      { $set: { requested_cancel: false } },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedUser) {
      throw createError({ statusCode: 404, statusMessage: "User not found" });
    }

    // Notify Admin
    sendAdminNotification(
      "Cancellation Request Withdrawn", 
      `A user has decided to keep their subscription: ${updatedUser.email}`
    );

    // Notify User
    sendUserEmail(
      updatedUser.email,
      "PERF - Cancellation Request Withdrawn",
      genericUserEmail(
        updatedUser,
        "We're glad you're staying!",
        "As requested, we have withdrawn your cancellation request. Your subscription remains active and you will continue to have full access to all features. We're happy to have you with us!"
      )
    );

    return {
      success: true,
      message: "Cancellation request withdrawn",
      requested_cancel: updatedUser.requested_cancel
    };
  } catch (err: any) {
    console.error("Undo Cancel API Error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
