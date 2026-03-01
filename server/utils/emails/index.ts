import nodemailer from 'nodemailer';

// Configuration
const SENDER_EMAIL = process.env.GMAIL_USER || 'perf912@gmail.com';
const ADMIN_EMAIL = 'perf912@gmail.com';

// Configure Gmail SMTP transporter using the 'service' shortcut for better stability
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

/**
 * Core function to send notification to admin
 */
export const sendAdminNotification = async (subject: string, html: string) => {
  console.log(`[Email] Attempting to send Admin Notification to ${ADMIN_EMAIL} via ${SENDER_EMAIL}`);

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.warn('[Email] Skipping real SMTP send: GMAIL credentials not set in .env');
    return { success: false, error: 'Credentials missing' };
  }

  try {
    const info = await transporter.sendMail({
      from: `"PERF System" <${SENDER_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `[PERF ADMIN] ${subject}`,
      html: html,
    });
    console.log('[Email] Admin notification sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('[Email] Failed to send admin email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Core function to send email to a specific user
 */
export const sendUserEmail = async (to: string, subject: string, html: string) => {
  console.log(`[Email] Attempting to send User Email to ${to} via ${SENDER_EMAIL}`);

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.warn('[Email] Skipping real SMTP send: GMAIL credentials not set in .env');
    return { success: false, error: 'Credentials missing' };
  }

  try {
    const info = await transporter.sendMail({
      from: `"PERF" <${SENDER_EMAIL}>`,
      to: to,
      subject: subject,
      html: html,
    });
    console.log('[Email] User email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error(`[Email] Failed to send email to ${to}:`, error);
    return { success: false, error: error.message };
  }
};

// Re-export templates for easy access
export * from './templates/signup';
export * from './templates/login';
export * from './templates/customer-created';
export * from './templates/upgrade-request';
export * from './templates/upgrade-cancel';
export * from './templates/contact-form';
export * from './templates/order-user';
export * from './templates/order-admin';
export * from './templates/generic-user';
export * from './templates/welcome-user';
