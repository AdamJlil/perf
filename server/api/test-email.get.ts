import { sendAdminNotification, sendUserEmail } from '../utils/emails';

export default defineEventHandler(async (event) => {
  try {
    const envStatus = {
      user: !!process.env.GMAIL_USER,
      pass: !!process.env.GMAIL_PASS,
      userValue: process.env.GMAIL_USER
    };

    console.log("[EmailTest] Env Status:", envStatus);

    // 1. Test Admin Notification (sent to perf912@gmail.com)
    const adminResult = await sendAdminNotification(
      "Admin Connection Test",
      "<h1>Hello from PERF</h1><p>The Admin Alert System via GMAIL is working!</p>"
    );

    // 2. Test User Email (Sending to the same address for testing)
    const userResult = await sendUserEmail(
      "perf912@gmail.com",
      "User Email Test",
      "<h1>Welcome to PERF</h1><p>The User Notification System via GMAIL is working!</p>"
    );

    return {
      success: adminResult?.success && userResult?.success,
      env: envStatus,
      admin_result: adminResult,
      user_result: userResult
    };
  } catch (error: any) {
    return {
      success: false,
      message: "An error occurred during the test",
      error: error.message
    };
  }
});
