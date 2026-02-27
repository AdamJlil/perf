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
  const { id } = body;

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Customer ID required" });
  }

  await connectToDatabase();

  try {
    const establishmentId = typeof payload.id === 'object' ? payload.id.toString() : payload.id;
    
    // Soft delete: set hasAccess to false instead of removing from DB
    const result = await Customer.updateOne(
      { _id: id, establishmentId },
      { $set: { hasAccess: false } }
    );
    
    if (result.matchedCount === 0) {
      throw createError({ statusCode: 404, statusMessage: "Customer not found" });
    }

    return {
      success: true,
      message: "Customer access removed successfully"
    };
  } catch (err: any) {
    console.error("Delete Customer API Error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
