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

  const { id } = await readBody(event);
  if (!id) throw createError({ statusCode: 400, statusMessage: "Customer ID required" });

  await connectToDatabase();

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) throw createError({ statusCode: 404, statusMessage: "Customer not found" });

    return { success: true, message: "Customer deleted permanently" };
  } catch (err: any) {
    throw createError({ statusCode: 500, statusMessage: err.message });
  }
});
