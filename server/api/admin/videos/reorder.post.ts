import Video from '../../../models/Video';
import { verifyToken } from '../../../utils/auth';
import { connectToDatabase } from '../../../utils/mongodb';

export default defineEventHandler(async (event) => {
  const cookieName = process.env.NUXT_COOKIE_NAME || "__session";
  const token = getCookie(event, cookieName);

  if (!token) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });

  const payload = await verifyToken(token);
  if (!payload || !payload.isAdmin) throw createError({ statusCode: 403, statusMessage: "Forbidden" });

  await connectToDatabase();
  const body = await readBody(event);

  if (!body.videoOrders || !Array.isArray(body.videoOrders)) {
    throw createError({ statusCode: 400, statusMessage: "videoOrders array is required" });
  }

  try {
    // Bulk update positions
    const promises = body.videoOrders.map((item: { id: string, order: number }) => {
      return Video.findByIdAndUpdate(item.id, { $set: { order: item.order } });
    });

    await Promise.all(promises);
    return { success: true };
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});
