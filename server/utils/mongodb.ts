import mongoose from 'mongoose';

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw createError({
      statusCode: 500,
      statusMessage: "MONGODB_URI is not defined",
    });
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Database connection failed",
    });
  }
};
