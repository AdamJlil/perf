import { User } from "~~/server/models/User";
import { getUserFromSession } from "~~/server/utils/session";

export default defineEventHandler(async (event) => {
  try {
    // Get the current user from session
    const currentUser = await getUserFromSession(event);
    if (!currentUser) {
      throw createError({
        statusCode: 401,
        message: "You must be logged in to update your profile"
      });
    }

    // Get the quiz data from request body
    const body = await readBody(event);
    const {
      age,
      height,
      weight,
      gender,
      hasAllergies,
      allergiesDetails,
      hasMedicalConditions,
      medicalConditionsDetails
    } = body;

    // Update user in database
    const userModel = new User();
    await userModel.updateUserQuiz(currentUser.id, {
      age: parseInt(age),
      height: parseInt(height),
      weight: parseInt(weight),
      gender,
      has_allergies: hasAllergies,
      allergies_details: allergiesDetails || null,
      has_medical_conditions: hasMedicalConditions,
      medical_conditions_details: medicalConditionsDetails || null
    });

    return { message: "Profile updated successfully" };
  } catch (error) {
    console.error('Error updating user quiz:', error);
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to update profile'
    });
  }
});
