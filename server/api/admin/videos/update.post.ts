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

  const { id, updates } = body || {};
  if (!id || !updates) {
    throw createError({ statusCode: 400, statusMessage: "ID and updates required" });
  }

  const set: any = {};

  if (updates.title !== undefined) {
    const title = String(updates.title).trim();
    if (!title) throw createError({ statusCode: 400, statusMessage: "Title cannot be empty" });
    set.title = title;
  }

  if (updates.url !== undefined) {
    const url = String(updates.url).trim();
    if (!/^https:\/\/.+/i.test(url)) {
      throw createError({ statusCode: 400, statusMessage: "URL must be a valid https:// embed link" });
    }
    set.url = url;
  }

  if (updates.description !== undefined) {
    set.description = String(updates.description).trim();
  }

  if (updates.calories !== undefined && updates.calories !== null) {
    if (typeof updates.calories !== "object") {
      throw createError({ statusCode: 400, statusMessage: "calories must be an object" });
    }
    // Normalize into the full age/weight/dumbbell matrix, filling holes with defaults
    const existing = await Video.findById(id);
    if (!existing) throw createError({ statusCode: 404, statusMessage: "Video not found" });
    const fallback = defaultVideoDataForIndex(existing.order ?? 0).calories;
    set.calories = normalizeCalorieMatrix(updates.calories, fallback);
  }

  if (updates.order !== undefined) {
    const order = Number(updates.order);
    if (!Number.isFinite(order) || order < 0) {
      throw createError({ statusCode: 400, statusMessage: "order must be a non-negative number" });
    }
    set.order = order;
  }

  if (Object.keys(set).length === 0) {
    throw createError({ statusCode: 400, statusMessage: "No valid fields to update" });
  }

  try {
    const video = await Video.findByIdAndUpdate(id, { $set: set }, { returnDocument: 'after', runValidators: true });
    if (!video) throw createError({ statusCode: 404, statusMessage: "Video not found" });
    return { success: true, video };
  } catch (err: any) {
    throw createError({ statusCode: err.statusCode || 500, statusMessage: err.statusMessage || err.message });
  }
});
