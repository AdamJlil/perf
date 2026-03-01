import Customer from '../../../models/Customer';
import { verifyToken } from '../../../utils/auth';
import { connectToDatabase } from '../../../utils/mongodb';

export default defineEventHandler(async (event) => {
  const cookieName = process.env.NUXT_COOKIE_NAME || "__session";
  const token = getCookie(event, cookieName);

  if (!token) throw createError({ statusCode: 401, statusMessage: "Unauthorized" });

  const payload = await verifyToken(token);
  if (!payload || !payload.isAdmin) {
    throw createError({ statusCode: 403, statusMessage: "Forbidden: Admin access required" });
  }

  const { id, updates } = await readBody(event);
  if (!id || !updates) throw createError({ statusCode: 400, statusMessage: "ID and updates required" });

  await connectToDatabase();

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { $set: updates },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedCustomer) throw createError({ statusCode: 404, statusMessage: "Customer not found" });

    return { success: true, customer: updatedCustomer };
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});
