import crypto from 'crypto';
import User from '../../models/User';
import { connectToDatabase } from '../../utils/mongodb';
import { sendUserEmail, passwordResetEmail } from '../../utils/emails';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email } = body;

  if (!email) {
    throw createError({ statusCode: 400, statusMessage: "Email is required" });
  }

  await connectToDatabase();

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    
    // Security: We don't reveal if the user exists or not
    if (!user) {
      return { success: true, message: "If your email exists in our system, you will receive a reset link shortly." };
    }

    // Generate random token
    const token = crypto.randomBytes(20).toString('hex');
    
    // Set expiry (1 hour from now)
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); 
    
    await user.save();

    // In production, use your real domain. For now, we use localhost.
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`;

    await sendUserEmail(
      user.email,
      "PERF - Password Reset Request",
      passwordResetEmail(user, resetUrl)
    );

    return { 
      success: true, 
      message: "If your email exists in our system, you will receive a reset link shortly." 
    };
  } catch (err: any) {
    console.error("Forgot Password API Error:", err);
    throw createError({ statusCode: 500, statusMessage: "Failed to process request" });
  }
});
