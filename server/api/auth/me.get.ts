import User from '../../models/User';
import { verifyToken } from '../../utils/auth';
import { connectToDatabase } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {
  const cookieName = process.env.NUXT_COOKIE_NAME || "__session";
  const token = getCookie(event, cookieName);

  if (!token) {
    return { user: null };
  }

  const payload = await verifyToken(token);
  if (!payload || !payload.email) {
    return { user: null };
  }

  await connectToDatabase();

  try {
    const user = await User.findOne({ email: payload.email.toLowerCase() });
    
    if (!user) {
      return { user: null };
    }

    const userObject = user.toObject();
    const { password: _, _id, ...rest } = userObject;
    
    return {
      user: {
        id: _id.toString(),
        ...rest,
        // Ensure status flags are explicitly included
        requested_plan: user.requested_plan || null,
        requested_cancel: !!user.requested_cancel,
        profile_picture: user.profile_picture || null
      },
    };
  } catch (error) {
    console.error("Me API Error:", error);
    return { user: null };
  }
});
