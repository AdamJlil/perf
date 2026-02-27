import { baseEmailTemplate } from './base';

export const loginEmail = (userData: any) => {
  const content = `
    <p>An establishment user has just logged into the dashboard.</p>
    <div class="info-box">
      <span class="label">User</span>
      <span class="value">${userData.first_name} ${userData.name}</span>
      
      <span class="label">Email</span>
      <span class="value">${userData.email}</span>
      
      <span class="label">Time</span>
      <span class="value">${new Date().toLocaleString()}</span>
    </div>
  `;
  return baseEmailTemplate(content, "User Login Activity");
};
