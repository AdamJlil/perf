import { baseEmailTemplate } from './base';

export const customerCreatedEmail = (establishment: any, customer: any) => {
  const content = `
    <p>A new customer has been added by an establishment.</p>
    
    <div class="info-box">
      <span class="label">Establishment</span>
      <span class="value">${establishment.first_name} ${establishment.name} (${establishment.email})</span>
    </div>

    <div class="info-box">
      <span class="label">New Customer</span>
      <span class="value">${customer.firstName} ${customer.lastName}</span>
      
      <span class="label">Customer Email</span>
      <span class="value">${customer.email}</span>
      
      <span class="label">Room / External ID</span>
      <span class="value accent">${customer.et_customer_id}</span>
    </div>
  `;
  return baseEmailTemplate(content, "Customer Added");
};
