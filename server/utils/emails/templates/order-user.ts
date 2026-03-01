import { baseEmailTemplate } from './base';

export const orderUserEmail = (orderData: any) => {
  const isBank = orderData.paymentMethod === 'bank';
  
  const paymentInstructions = isBank 
    ? `
      <div class="info-box" style="border-left-color: #D05E33;">
        <span class="label">Bank Transfer Details</span>
        <span class="value"><strong>Account:</strong> PERF FITNESS & WELLNESS</span>
        <span class="value"><strong>RIB:</strong> 011 590 0000112000002178 72</span>
        <span class="value"><strong>IBAN:</strong> MA64 0115 9000 0011 2000 0021 7872</span>
        <span class="value"><strong>BIC:</strong> BMCEMAMC</span>
        <p style="font-size: 12px; margin-top: 15px;">Please include your establishment name in the transfer reference.</p>
      </div>
    `
    : `
      <div class="info-box" style="border-left-color: #D05E33;">
        <span class="label">Cash on Delivery</span>
        <p class="value">Payment will be collected upon delivery of your PERF equipment box at your specified address.</p>
        <p style="font-size: 12px; margin-top: 15px;">Our team will contact you shortly to coordinate the delivery time.</p>
      </div>
    `;

  const content = `
    <p>Hey ${orderData.first_name},</p>
    <p>Thank you for joining the PERF community! Your order for the <strong class="accent">${orderData.plan}</strong> plan has been received.</p>
    
    <div class="info-box">
      <span class="label">Customer Account</span>
      <span class="value"><strong>User:</strong> ${orderData.first_name} ${orderData.name}</span>
      <span class="value"><strong>Email:</strong> ${orderData.email}</span>
    </div>

    ${paymentInstructions}

    <div class="info-box">
      <span class="label">Delivery Address</span>
      <span class="value">${orderData.address}, ${orderData.city}</span>
      
      <span class="label">Total Amount</span>
      <span class="value accent">${orderData.price}</span>
    </div>

    <p>Once your payment is confirmed, your account will be fully activated, and you'll gain access to all dashboard features.</p>
    
    <p>If you have any questions, feel free to reply to this email.</p>
  `;

  return baseEmailTemplate(content, "Order Confirmation & Payment Instructions");
};
