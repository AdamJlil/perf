import Video from '../models/Video';
import { verifyToken } from '../utils/auth';
import { connectToDatabase } from '../utils/mongodb';
import { defaultVideoDataForIndex } from '../utils/videoDefaults';

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
      videos: videos.map((v, index) => {
        const defaults = defaultVideoDataForIndex(index);
        return {
          id: v._id.toString(),
          url: v.url,
          title: v.title,
          order: v.order ?? index,
          description: v.description || defaults.description,
          calories: v.calories || defaults.calories,
        };
      })
    };
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});
