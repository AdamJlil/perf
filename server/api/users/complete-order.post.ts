import { 
  sendAdminNotification, 
  sendUserEmail, 
  orderUserEmail, 
  orderAdminEmail 
} from '../../utils/emails';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
  // Validation
  if (!body.email || !body.first_name || !body.address) {
    throw createError({
      statusCode: 400,
      statusMessage: "Required order information is missing",
    });
  }

  try {
    console.log(`[OrderAPI] Completing order for ${body.email}`);

    // 1. Send confirmation to User with payment instructions
    await sendUserEmail(
      body.email,
      "PERF - Order Confirmation & Payment Instructions",
      orderUserEmail(body)
    );

    // 2. Send notification to Admin
    await sendAdminNotification(
      `New Order: ${body.plan} from ${body.first_name}`,
      orderAdminEmail(body)
    );

    return {
      success: true,
      message: "Order processed and emails sent",
    };
  } catch (err: any) {
    console.error("Order API Error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to complete order processing",
    });
  }
});
