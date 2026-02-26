import User from '../../models/User';
import { hashPassword } from '../../utils/auth';
import { connectToDatabase } from '../../utils/mongodb';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password, type, first_name, name, plan } = body;

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
      paid: false,
    });

    console.log(`Signup Success: User ${email} stored in MongoDB`);

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
