import { sendAdminNotification, contactFormEmail } from '../../utils/emails';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, message } = body;

  if (!name || !email || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: "All fields are required",
    });
  }

  try {
    console.log(`[ContactAPI] New message from ${email}`);

    // Send notification to admin
    await sendAdminNotification(
      `New Message from ${name}`,
      contactFormEmail({ name, email, message })
    );

    return {
      success: true,
      message: "Message sent successfully",
    };
  } catch (err: any) {
    console.error("Contact API Error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to send message",
    });
  }
});
