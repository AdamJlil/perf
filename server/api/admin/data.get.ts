import User from '../../models/User';
import Customer from '../../models/Customer';
import Video from '../../models/Video';
import { verifyToken } from '../../utils/auth';
import { connectToDatabase } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {
  const cookieName = process.env.NUXT_COOKIE_NAME || "__session";
  const token = getCookie(event, cookieName);

  if (!token) {
    console.error("[AdminAPI] No token found in cookies");
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const payload = await verifyToken(token);
  console.log("[AdminAPI] Token Payload:", payload);

  if (!payload || !payload.id || !payload.isAdmin) {
    console.error("[AdminAPI] Forbidden access attempt:", payload);
    throw createError({ statusCode: 403, statusMessage: "Forbidden: Admin access required" });
  }

  await connectToDatabase();

  try {
    console.log("[AdminAPI] Fetching all database documents...");
    const allUsers = await User.find({}).sort({ createdAt: -1 });
    const allCustomers = await Customer.find({}).sort({ createdAt: -1 });
    const allVideos = await Video.find({}).sort({ order: 1 });

    console.log(`[AdminAPI] Found ${allUsers.length} users, ${allCustomers.length} customers and ${allVideos.length} videos`);

    return {
      success: true,
      data: {
        users: allUsers.map(u => {
          const obj = u.toObject();
          const { password, ...rest } = obj;
          return {
            ...rest,
            id: obj._id.toString()
          };
        }),
        customers: allCustomers.map(c => {
          const obj = c.toObject();
          if (obj.burnedCalories instanceof Map) {
            obj.burnedCalories = Object.fromEntries(obj.burnedCalories);
          }
          return {
            ...obj,
            id: obj._id.toString()
          };
        }),
        videos: allVideos.map(v => {
          const obj = v.toObject();
          return {
            ...obj,
            id: obj._id.toString()
          };
        })
      }
    };
  } catch (err: any) {
    console.error("[AdminAPI] Database Error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error: " + err.message,
    });
  }
});
