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

  if (!body.url) {
    throw createError({ statusCode: 400, statusMessage: "URL is required" });
  }

  try {
    const video = await Video.create({
      url: body.url,
      title: body.title || 'New Video'
    });

    return { success: true, video };
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});
