import { baseEmailTemplate } from './base';

export const upgradeRequestEmail = (userData: any, newPlan: string) => {
  const content = `
    <p>A user is interested in upgrading their account.</p>
    <div class="info-box">
      <span class="label">User</span>
      <span class="value">${userData.first_name} ${userData.name}</span>
      
      <span class="label">Current Plan</span>
      <span class="value">${userData.plan}</span>
      
      <span class="label">Requested Plan</span>
      <span class="value accent">${newPlan}</span>
    </div>
    <p>Please contact the establishment to finalize the upgrade process.</p>
  `;
  return baseEmailTemplate(content, "Upgrade Request Received");
};
