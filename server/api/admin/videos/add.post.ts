import Video from '../../../models/Video';
import { verifyToken } from '../../../utils/auth';
import { connectToDatabase } from '../../../utils/mongodb';
import { normalizeCalorieMatrix, defaultVideoDataForIndex } from '../../../utils/videoDefaults';

export default defineEventHandler(async (event) => {
  const cookieName = process.env.NUXT_COOKIE_NAME || "__session";
  const token = getCookie(event, cookieName);

  if (!token) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });

  const payload = await verifyToken(token);
  if (!payload || !payload.isAdmin) throw createError({ statusCode: 403, statusMessage: "Forbidden" });

  await connectToDatabase();
  const body = await readBody(event);

  if (!body.url || !/^https:\/\/.+/i.test(String(body.url).trim())) {
    throw createError({ statusCode: 400, statusMessage: "A valid https:// URL is required" });
  }

  try {
    // Append at the end of the current sequence instead of colliding at order 0
    const last = await Video.findOne({}).sort({ order: -1 });
    const nextOrder = last ? (last.order ?? 0) + 1 : 0;

    const defaults = defaultVideoDataForIndex(nextOrder);
    const calories =
      body.calories && typeof body.calories === "object"
        ? normalizeCalorieMatrix(body.calories, defaults.calories)
        : defaults.calories;

    const video = await Video.create({
      url: String(body.url).trim(),
      title: String(body.title || 'New Video').trim() || 'New Video',
      description: String(body.description ?? defaults.description).trim(),
      calories,
      order: nextOrder,
    });

    return { success: true, video };
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});
