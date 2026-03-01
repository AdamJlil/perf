import User from '../../models/User';
import { comparePassword, createToken } from '../../utils/auth';
import { connectToDatabase } from '../../utils/mongodb';
import { sendAdminNotification, loginEmail } from '../../utils/emails';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password, rememberMe } = body;

  console.log(`Login Attempt: ${email}`);

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password are required",
    });
  }

  await connectToDatabase();

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.warn(`Login API: User not found: ${email}`);
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password",
      });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      console.warn(`Login API: Invalid password for: ${email}`);
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid email or password",
      });
    }

    const expiresAt = new Date(
      Date.now() + (rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)
    );

    const token = await createToken({ 
      id: user._id.toString(), 
      email: user.email, 
      isAdmin: !!user.isAdmin,
      isMaster: !!user.isMaster
    }, expiresAt);
    const cookieName = process.env.NUXT_COOKIE_NAME || "__session";

    setCookie(event, cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

    console.log(`Login Success: User ${email} authenticated`);

    // Increment login count
    const isFirstLogin = (user.login_count || 0) === 0;
    user.login_count = (user.login_count || 0) + 1;
    await user.save();

    // Notify Admin
    sendAdminNotification("User Login Activity", loginEmail(user));

    const userObject = user.toObject();
    const { password: _, _id, ...rest } = userObject;
    const userWithoutPassword = {
      id: _id.toString(),
      ...rest,
      isAdmin: !!user.isAdmin,
      isMaster: !!user.isMaster,
    };

    return {
      user: userWithoutPassword,
      isFirstLogin,
    };
  } catch (err: any) {
    console.error("Login API Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || "Internal Server Error",
    });
  }
});
