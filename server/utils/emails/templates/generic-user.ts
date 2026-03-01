import { baseEmailTemplate } from './base';

export const genericUserEmail = (userData: any, title: string, message: string) => {
  const content = `
    <p>Hey ${userData.first_name},</p>
    <p>${message}</p>
    
    <div class="info-box">
      <span class="label">Account Details</span>
      <span class="value"><strong>User:</strong> ${userData.first_name} ${userData.name}</span>
      <span class="value"><strong>Email:</strong> ${userData.email}</span>
    </div>

    <div class="footer" style="margin-top: 40px; border-top: 1px solid #eeeeee; padding-top: 20px;">
      <p>Need help? Contact us at perf912@gmail.com</p>
    </div>
  `;
  return baseEmailTemplate(content, title);
};
