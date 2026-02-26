import User from '../../models/User';
import { verifyToken } from '../../utils/auth';
import { connectToDatabase } from '../../utils/mongodb';

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
  const { profile_picture } = body;

  await connectToDatabase();

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: payload.email.toLowerCase() },
      { $set: { profile_picture } },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedUser) {
      throw createError({ statusCode: 404, statusMessage: "User not found" });
    }

    return {
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id.toString(),
        email: updatedUser.email,
        first_name: updatedUser.first_name,
        name: updatedUser.name,
        profile_picture: updatedUser.profile_picture
      }
    };
  } catch (err: any) {
    console.error("Update Profile API Error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
