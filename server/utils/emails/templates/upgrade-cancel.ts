import { baseEmailTemplate } from './base';

export const upgradeCancelEmail = (userData: any, cancelledPlan: string) => {
  const content = `
    <p>A user has withdrawn their upgrade request.</p>
    <div class="info-box">
      <span class="label">User</span>
      <span class="value">${userData.first_name} ${userData.name}</span>
      
      <span class="label">Withdrawn Plan Request</span>
      <span class="value">${cancelledPlan}</span>
    </div>
  `;
  return baseEmailTemplate(content, "Upgrade Request Withdrawn");
};
