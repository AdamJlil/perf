import Video from '../models/Video';
import { verifyToken } from '../utils/auth';
import { connectToDatabase } from '../utils/mongodb';

export default defineEventHandler(async (event) => {
  const cookieName = process.env.NUXT_COOKIE_NAME || "__session";
  const token = getCookie(event, cookieName);

  if (!token) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });

  const payload = await verifyToken(token);
  if (!payload) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });

  await connectToDatabase();

  try {
    const videos = await Video.find({}).sort({ order: 1 });
    return {
      success: true,
      videos: videos.map(v => ({
        id: v._id.toString(),
        url: v.url,
        title: v.title
      }))
    };
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});
