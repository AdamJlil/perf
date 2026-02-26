import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default defineEventHandler(async (event) => {
  const cookieName = process.env.NUXT_COOKIE_NAME || "__session";
  const token = getCookie(event, cookieName);

  if (!token) {
    console.log(`Me API: No token found in cookie ${cookieName}`);
    return { user: null };
  }

  const payload = await verifyToken(token);
  if (!payload || !payload.email) {
    console.warn("Me API: Token verification failed or invalid payload");
    return { user: null };
  }

  console.log(`Me API: Token verified for ${payload.email}, fetching user from Redis...`);
  // Use redis.get instead of kv.get
  const user = await redis.get<any>(`user:${payload.email}`);
  
  if (!user) {
    console.warn(`Me API: User ${payload.email} not found in Redis`);
    return { user: null };
  }

  const { password: _, ...userWithoutPassword } = user;
  console.log(`Me API: User ${payload.email} retrieved successfully`);

  return {
    user: userWithoutPassword,
  };
});
