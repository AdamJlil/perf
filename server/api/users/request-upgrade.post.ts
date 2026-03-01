import User from "../../models/User";
import { verifyToken } from "../../utils/auth";
import { connectToDatabase } from "../../utils/mongodb";
import { sendAdminNotification, upgradeRequestEmail } from "../../utils/emails";

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

  const body = await readBody(event);
  const { planTitle } = body;

  console.log(`[UpgradeAPI] User: ${payload.email}, Requested: ${planTitle}`);

  if (!planTitle) {
    throw createError({ statusCode: 400, statusMessage: "Plan title is required" });
  }

  await connectToDatabase();

  try {
    // Force lowercase email match just in case
    const userEmail = payload.email.toLowerCase();

    // Fetch the current user to check their current plan
    const currentUser = await User.findOne({ email: userEmail });
    if (!currentUser) {
      console.error(`[UpgradeAPI] No user found for email: ${userEmail}`);
      throw createError({ statusCode: 404, statusMessage: "User not found" });
    }

    // Build the update object
    const updatePayload: any = { $set: { requested_plan: planTitle } };
    
    // Automatically reset registration_denied to false if the requested plan is new
    if (planTitle !== currentUser.plan) {
      updatePayload.$set.registration_denied = false;
    }

    // Use findOneAndUpdate to get the document and ensure it exists
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      updatePayload,
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedUser) {
      console.error(`[UpgradeAPI] No user found for email: ${userEmail}`);
      throw createError({ statusCode: 404, statusMessage: "User not found" });
    }

    console.log(`[UpgradeAPI] Successfully updated ${userEmail}. New requested_plan: ${updatedUser.requested_plan}`);

    // Notify Admin
    sendAdminNotification("Upgrade Request Received", upgradeRequestEmail(updatedUser, planTitle));

    // Notify User
    sendUserEmail(
      updatedUser.email,
      "PERF - Upgrade Request Received",
      genericUserEmail(
        updatedUser, 
        "Upgrade Request Received", 
        `We have received your request to upgrade to the <strong>${planTitle}</strong> plan. Our team will review it and contact you shortly to finalize the details.`
      )
    );

    return {
      success: true,
      message: "Upgrade request received",
      requested_plan: updatedUser.requested_plan,
    };
  } catch (err: any) {
    console.error("[UpgradeAPI] Database Error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Database update failed: " + err.message,
    });
  }
});
