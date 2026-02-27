import { baseEmailTemplate } from './base';

export const contactFormEmail = (contactData: { name: string, email: string, message: string }) => {
  const content = `
    <p>You have received a new message from the website contact form.</p>
    <div class="info-box">
      <span class="label">From</span>
      <span class="value">${contactData.name}</span>
      
      <span class="label">Email</span>
      <span class="value accent">${contactData.email}</span>
      
      <span class="label">Message</span>
      <span class="value" style="white-space: pre-line;">${contactData.message}</span>
      
      <span class="label">Received at</span>
      <span class="value">${new Date().toLocaleString()}</span>
    </div>
  `;
  return baseEmailTemplate(content, "New Contact Message");
};
