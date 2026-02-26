import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password, rememberMe } = body;

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password are required",
    });
  }

  // SPECIAL TEST ACCOUNT AUTO-SEEDING
  if (email === "test@perf.ma" && password === "password123") {
    let testUser = await redis.get<any>(`user:${email}`);
    if (!testUser) {
      const hashedPassword = await hashPassword(password);
      testUser = {
        id: "test-user-id",
        email: email,
        password: hashedPassword,
        type: "ESTABLISHEMENT",
        first_name: "Test",
        name: "User",
        roles: ["establishment"],
        plan: JSON.stringify({ title: "SIGNATURE", price: "8000" }),
        paid: true,
        createdAt: new Date().toISOString(),
      };
      await redis.set(`user:${email}`, testUser);
    }
  }

  // Standard Login Logic
  const user = await redis.get<any>(`user:${email}`);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password",
    });
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid email or password",
    });
  }

  const expiresAt = new Date(
    Date.now() + (rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)
  );

  const token = await createToken({ id: user.id, email: user.email }, expiresAt);
  const cookieName = process.env.NUXT_COOKIE_NAME || "__session";

  setCookie(event, cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
  };
});
