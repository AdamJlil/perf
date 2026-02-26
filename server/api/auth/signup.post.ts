import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password, type, first_name, name, plan } = body;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password are required",
    });
  }

  // Check if user already exists
  const existingUser = await redis.get(`user:${email}`);
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: "User already exists",
    });
  }

  const hashedPassword = await hashPassword(password);

  const newUser = {
    id: crypto.randomUUID(),
    email,
    password: hashedPassword,
    type,
    first_name,
    name,
    plan,
    paid: false,
    createdAt: new Date().toISOString(),
  };

  // Save to Redis
  await redis.set(`user:${email}`, newUser);

  const { password: _, ...userWithoutPassword } = newUser;

  return {
    user: userWithoutPassword,
  };
});
