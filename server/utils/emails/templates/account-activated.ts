import { baseEmailTemplate } from './base';

export const accountActivatedEmail = (userData: any) => {
  const content = `
    <p>Hey ${userData.first_name},</p>
    <p>Great news! Your <strong>PERF</strong> account has been reviewed and is now <strong>officially active</strong>.</p>
    
    <div class="info-box">
      <span class="label">Subscription Details</span>
      <span class="value"><strong>Plan:</strong> ${userData.plan}</span>
      <span class="value"><strong>Status:</strong> Active & Paid</span>
    </div>

    <div class="info-box" style="text-align: center;">
      <p>You can now access your dashboard to manage customers and start your wellness program.</p>
      <a href="${process.env.BASE_URL || 'http://localhost:3000'}/auth/login" class="button">Go to Dashboard</a>
    </div>

    <p>If you need any assistance with your PERF equipment or dashboard setup, our team is here to help.</p>
    
    <p>Let's start this wellness journey together!</p>
  `;
  return baseEmailTemplate(content, "Your PERF Account is Active!");
};
