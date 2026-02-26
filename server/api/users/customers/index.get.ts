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

  await connectToDatabase();

  try {
    // Ensure we have a string ID for the query
    const establishmentId = typeof payload.id === 'object' ? payload.id.toString() : payload.id;
    
    const customers = await Customer.find({ establishmentId }).sort({ createdAt: -1 });
    
    // Convert Map to Object for JSON response
    return customers.map(c => {
      const obj = c.toObject();
      if (obj.burnedCalories instanceof Map) {
        obj.burnedCalories = Object.fromEntries(obj.burnedCalories);
      }
      return {
        ...obj,
        id: obj._id.toString()
      };
    });
  } catch (err: any) {
    console.error("Fetch Customers API Error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
