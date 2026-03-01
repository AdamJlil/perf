import { baseEmailTemplate } from './base';

export const welcomeUserEmail = (userData: any) => {
  const content = `
    <p>Hey ${userData.first_name},</p>
    <p>Welcome to <strong>PERF</strong>! We're thrilled to have you join our community of wellness-focused establishments.</p>
    
    <div class="info-box">
      <span class="label">Account Details</span>
      <span class="value"><strong>User:</strong> ${userData.first_name} ${userData.name}</span>
      <span class="value"><strong>Email:</strong> ${userData.email}</span>
    </div>

    <div class="info-box">
      <p>Your account has been created successfully. To unlock all features and receive your PERF equipment box, please complete the checkout process.</p>
    </div>

    <p>If you've already completed your checkout, our team is currently reviewing your information and will activate your account shortly.</p>
    
    <p>Get ready to elevate your guest experience!</p>
  `;
  return baseEmailTemplate(content, "Welcome to PERF");
};
