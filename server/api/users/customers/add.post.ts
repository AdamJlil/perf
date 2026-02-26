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
  const { 
    et_customer_id, 
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
    burnedCalories, 
    profile_picture 
  } = body;

  if (!et_customer_id) {
    throw createError({ statusCode: 400, statusMessage: "Customer ID required" });
  }

  await connectToDatabase();

  try {
    // Build update object dynamically
    const updateData: any = {
      establishmentId: typeof payload.id === 'object' ? payload.id.toString() : payload.id,
    };

    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (gender !== undefined) updateData.gender = gender;
    if (age !== undefined) updateData.age = age;
    if (height !== undefined) updateData.height = height;
    if (weight !== undefined) updateData.weight = weight;
    if (ageRange !== undefined) updateData.ageRange = ageRange;
    if (weightRange !== undefined) updateData.weightRange = weightRange;
    if (video !== undefined) updateData.video = video;
    if (burnedCalories !== undefined) updateData.burnedCalories = burnedCalories;
    if (profile_picture !== undefined) updateData.profile_picture = profile_picture;

    const updatedCustomer = await Customer.findOneAndUpdate(
      { et_customer_id },
      { $set: updateData },
      { upsert: true, returnDocument: 'after', runValidators: true }
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
