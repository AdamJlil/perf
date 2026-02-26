import Customer from '../../../models/Customer';
import { verifyToken } from '../../../utils/auth';
import { connectToDatabase } from '../../../utils/mongodb';

export default defineEventHandler(async (event) => {
  const cookieName = process.env.NUXT_COOKIE_NAME || "__session";
  const token = getCookie(event, cookieName);

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  const payload = await verifyToken(token);
  if (!payload || !payload.id) {
    throw createError({ statusCode: 401, statusMessage: "Invalid session" });
  }

  const body = await readBody(event);
  const { et_customer_id, firstName, lastName, email, phone, gender, age, height, weight, ageRange, weightRange, video, burnedCalories } = body;

  if (!et_customer_id || !firstName || !lastName || !email) {
    throw createError({ statusCode: 400, statusMessage: "Required fields missing" });
  }

  await connectToDatabase();

  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { et_customer_id },
      { 
        $set: {
          establishmentId: payload.id,
          firstName,
          lastName,
          email,
          phone,
          gender,
          age,
          height,
          weight,
          ageRange,
          weightRange,
          video,
          burnedCalories: burnedCalories || { 'Day 1': 0 }
        }
      },
      { upsert: true, new: true, runValidators: true }
    );

    return {
      success: true,
      customer: updatedCustomer
    };
  } catch (err: any) {
    console.error("Add/Update Customer API Error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
