import { baseEmailTemplate } from './base';

export const passwordResetEmail = (userData: any, resetUrl: string) => {
  const content = `
    <p>Hello ${userData.first_name},</p>
    <p>You are receiving this email because you (or someone else) have requested the reset of the password for your PERF account.</p>
    
    <div class="info-box" style="text-align: center; margin: 30px 0;">
      <p>Please click on the following button to complete the process:</p>
      <a href="${resetUrl}" class="button">Reset My Password</a>
    </div>

    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    
    <p>This link will expire in 1 hour.</p>
    <br/>
    <p>Best regards,<br/>The PERF Team</p>
  `;
  return baseEmailTemplate(content, "Reset Your PERF Password");
};
