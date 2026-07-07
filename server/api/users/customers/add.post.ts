import Customer from '../../../models/Customer';
import User from '../../../models/User';
import { verifyToken } from '../../../utils/auth';
import { connectToDatabase } from '../../../utils/mongodb';
import { sendAdminNotification, customerCreatedEmail } from '../../../utils/emails';

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

  // Server-side sanity validation (the quiz validates client-side, but the API must not trust it)
  if (age !== undefined && age !== null && (isNaN(Number(age)) || Number(age) < 5 || Number(age) > 120)) {
    throw createError({ statusCode: 400, statusMessage: "Age must be between 5 and 120" });
  }
  if (weight !== undefined && weight !== null && (isNaN(Number(weight)) || Number(weight) < 20 || Number(weight) > 400)) {
    throw createError({ statusCode: 400, statusMessage: "Weight must be between 20 and 400 kg" });
  }
  if (height !== undefined && height !== null && height !== '' && (isNaN(Number(height)) || Number(height) < 50 || Number(height) > 260)) {
    throw createError({ statusCode: 400, statusMessage: "Height must be between 50 and 260 cm" });
  }

  await connectToDatabase();

  try {
    // Ensure we have a string ID
    const establishmentId = typeof payload.id === 'object' ? payload.id.toString() : payload.id;

    // Ownership protection: an establishment may only update its OWN customers
    const existing = await Customer.findOne({ et_customer_id });
    if (existing && existing.establishmentId?.toString() !== establishmentId && !payload.isAdmin) {
      throw createError({ statusCode: 403, statusMessage: "Forbidden: customer belongs to another establishment" });
    }

    // Build update object dynamically (keep the original owner when an admin edits)
    const updateData: any = {
      establishmentId: existing ? existing.establishmentId : establishmentId,
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

    // If it's a NEW customer (created just now)
    if (updatedCustomer.createdAt.getTime() === updatedCustomer.updatedAt.getTime()) {
      const establishment = await User.findById(establishmentId);
      if (establishment) {
        sendAdminNotification("Customer Added", customerCreatedEmail(establishment, updatedCustomer));
      }
    }

    return {
      success: true,
      customer: updatedCustomer
    };
  } catch (err: any) {
    console.error("Add/Update Customer API Error:", err);
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || "Internal Server Error",
    });
  }
});
