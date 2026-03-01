import User from '../../models/User';
import { hashPassword, verifyToken } from '../../utils/auth';
import { connectToDatabase } from '../../utils/mongodb';
import { sendAdminNotification, sendUserEmail, signupEmail, welcomeUserEmail } from '../../utils/emails';

export default defineEventHandler(async (event) => {
  const cookieName = process.env.NUXT_COOKIE_NAME || "__session";
  const token = getCookie(event, cookieName);
  const payload = token ? await verifyToken(token) : null;
  const isRequestingAdmin = !!payload?.isAdmin;
  const isRequestingMaster = !!payload?.isMaster;

  const body = await readBody(event);
  const { email, password, type, first_name, name, plan } = body;

  // HIERARCHY PROTECTION:
  // 1. Only Master Admin can create other Admins or Masters.
  // 2. Regular Admin can ONLY create Establishments.
  if (body.isAdmin && !isRequestingMaster) {
    throw createError({ statusCode: 403, statusMessage: "Forbidden: Only Master Admin can create other Admin accounts" });
  }

  console.log(`Signup Attempt: ${email}`);

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Email and password are required",
    });
  }

  await connectToDatabase();

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn(`Signup Warning: User ${email} already exists`);
      throw createError({
        statusCode: 409,
        statusMessage: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      type,
      first_name,
      name,
      plan,
      paid: isRequestingAdmin ? !!body.paid : false,
      isAdmin: isRequestingAdmin ? !!body.isAdmin : false,
      isMaster: isRequestingAdmin ? !!body.isMaster : false,
    });

    console.log(`Signup Success: User ${email} stored in MongoDB`);

    // Notify Admin
    sendAdminNotification("New Registration", signupEmail(newUser));

    // Welcome User
    sendUserEmail(newUser.email, "Welcome to PERF", welcomeUserEmail(newUser));

    const userObject = newUser.toObject();
    const { password: _, _id, ...rest } = userObject;
    const userWithoutPassword = {
      id: _id.toString(),
      ...rest,
    };

    return {
      user: userWithoutPassword,
    };
  } catch (err: any) {
    console.error("Signup API Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || err.message || "Database connection error",
    });
  }
});
