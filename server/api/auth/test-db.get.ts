import mongoose from 'mongoose';
import User from '../../models/User';
import { connectToDatabase } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {
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
