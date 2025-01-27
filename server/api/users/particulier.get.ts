import { User } from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  try {
    const userModel = new User();
    const users = await userModel.getAllParticularUsers();
    return users;
  } catch (error) {
    console.error('Error fetching PARTICULIER users:', error);
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch users'
    });
  }
});
