import { baseEmailTemplate } from './base';

export const signupEmail = (userData: any) => {
  const content = `
    <p>A new establishment has just joined the PERF platform.</p>
    <div class="info-box">
      <span class="label">Establishment Name</span>
      <span class="value">${userData.first_name} ${userData.name}</span>
      
      <span class="label">Email Address</span>
      <span class="value">${userData.email}</span>
      
      <span class="label">Selected Plan</span>
      <span class="value accent">${userData.plan || 'EXPLORER'}</span>
      
      <span class="label">Registration Date</span>
      <span class="value">${new Date().toLocaleString()}</span>
    </div>
    <p>Please review the account and prepare for onboarding.</p>
  `;
  return baseEmailTemplate(content, "New Registration");
};
