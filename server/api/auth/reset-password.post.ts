import User from '../../models/User';
import { connectToDatabase } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { token, password } = body;

  if (!token || !password) {
    throw createError({ statusCode: 400, statusMessage: "Token and password are required" });
  }

  await connectToDatabase();

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      console.warn("[ResetAPI] Token invalid or expired");
      throw createError({ 
        statusCode: 400, 
        statusMessage: "Password reset token is invalid or has expired." 
      });
    }

    console.log(`[ResetAPI] Found user: ${user.email}. Updating password...`);
    // Update password (middleware will hash it)
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();
    console.log(`[ResetAPI] Password saved for ${user.email}`);

    return { success: true, message: "Password updated successfully! You can now log in." };
  } catch (err: any) {
    console.error("Reset Password API Error:", err);
    throw createError({ 
      statusCode: err.statusCode || 500, 
      statusMessage: err.statusMessage || "Internal Server Error" 
    });
  }
});
