import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Admin recipient
const ADMIN_EMAIL = 'contact@perf.ma';

// Configure transporter (Update these in your .env for real sending)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Core function to send notification to admin
 */
export const sendAdminNotification = async (subject: string, html: string) => {
  console.log(`[Email] Sending Admin Notification: ${subject}`);

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[Email] Skipping real SMTP send: SMTP credentials not set in .env');
    return;
  }

  try {
    await transporter.sendMail({
      from: '"PERF Notifications" <no-reply@perf.ma>',
      to: ADMIN_EMAIL,
      subject: `[PERF ADMIN] ${subject}`,
      html: html,
    });
    console.log('[Email] Sent successfully');
  } catch (error) {
    console.error('[Email] Failed to send real email:', error);
  }
};

// Re-export templates for easy access
export * from './templates/signup';
export * from './templates/login';
export * from './templates/customer-created';
export * from './templates/upgrade-request';
export * from './templates/upgrade-cancel';
export * from './templates/contact-form';
