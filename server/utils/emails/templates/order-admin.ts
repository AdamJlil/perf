import { baseEmailTemplate } from './base';

export const orderAdminEmail = (orderData: any) => {
  const content = `
    <p>A new order has been completed on the platform.</p>
    
    <div class="info-box">
      <span class="label">Establishment</span>
      <span class="value">${orderData.first_name} ${orderData.name}</span>
      
      <span class="label">Email</span>
      <span class="value">${orderData.email}</span>
      
      <span class="label">Phone</span>
      <span class="value">${orderData.phone}</span>
    </div>

    <div class="info-box">
      <span class="label">Plan</span>
      <span class="value accent">${orderData.plan}</span>
      
      <span class="label">Price</span>
      <span class="value">${orderData.price}</span>
      
      <span class="label">Payment Method</span>
      <span class="value accent">${orderData.paymentMethod.toUpperCase()}</span>
    </div>

    <div class="info-box">
      <span class="label">Shipping Address</span>
      <span class="value">${orderData.address}, ${orderData.city}</span>
    </div>

    <p>Please coordinate the payment verification and delivery.</p>
  `;

  return baseEmailTemplate(content, "New Order Received");
};
