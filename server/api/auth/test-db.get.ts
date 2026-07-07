import mongoose from 'mongoose';
import User from '../../models/User';
import { connectToDatabase } from '../../utils/mongodb';
import { verifyToken } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  // Admin-only diagnostic endpoint
  const cookieName = process.env.NUXT_COOKIE_NAME || "__session";
  const token = getCookie(event, cookieName);
  const payload = token ? await verifyToken(token) : null;
  if (!payload || !payload.isAdmin) {
    throw createError({ statusCode: 403, statusMessage: "Forbidden: Admin access required" });
  }

  try {
    await connectToDatabase();

    const state = mongoose.connection.readyState;
    const stateNames = ['disconnected', 'connected', 'connecting', 'disconnecting'];

    // Count users to verify read access
    const userCount = await User.countDocuments();

    return {
      success: true,
      message: "Connected to MongoDB Atlas successfully",
      connection_state: stateNames[state],
      user_count: userCount
    };
  } catch (error: any) {
    console.error("MongoDB Connection Error:", error);
    return {
      success: false,
      error: error.message,
      env_uri_exists: !!process.env.MONGODB_URI
    };
  }
});
