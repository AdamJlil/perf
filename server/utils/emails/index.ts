import nodemailer from "nodemailer";

// Configuration
const SENDER_EMAIL = process.env.ZOHO_USER || "contact@perf-club.com";
const ADMIN_EMAIL = "contact@perf-club.com";

// Configure Zoho SMTP transporter
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_USER,
    pass: process.env.ZOHO_PASS,
  },
});

/**
 * Core function to send notification to admin
 */
export const sendAdminNotification = async (subject: string, html: string) => {
  console.log(`[Email] Attempting to send Admin Notification to ${ADMIN_EMAIL} via ${SENDER_EMAIL}`);

  if (!process.env.ZOHO_USER || !process.env.ZOHO_PASS) {
    console.warn("[Email] Skipping real SMTP send: ZOHO credentials not set in .env");
    return { success: false, error: "Credentials missing" };
  }

  try {
    const info = await transporter.sendMail({
      from: `"PERF System" <${SENDER_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `[PERF ADMIN] ${subject}`,
      html: html,
    });
    console.log("[Email] Admin notification sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("[Email] Failed to send admin email:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Core function to send email to a specific user
 */
export const sendUserEmail = async (to: string, subject: string, html: string) => {
  console.log(`[Email] Attempting to send User Email to ${to} via ${SENDER_EMAIL}`);

  if (!process.env.ZOHO_USER || !process.env.ZOHO_PASS) {
    console.warn("[Email] Skipping real SMTP send: ZOHO credentials not set in .env");
    return { success: false, error: "Credentials missing" };
  }

  try {
    const info = await transporter.sendMail({
      from: `"PERF" <${SENDER_EMAIL}>`,
      to: to,
      subject: subject,
      html: html,
    });
    console.log("[Email] User email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error(`[Email] Failed to send email to ${to}:`, error);
    return { success: false, error: error.message };
  }
};

// Re-export templates for easy access
export * from "./templates/signup";
export * from "./templates/login";
export * from "./templates/customer-created";
export * from "./templates/upgrade-request";
export * from "./templates/upgrade-cancel";
export * from "./templates/contact-form";
export * from "./templates/order-user";
export * from "./templates/order-admin";
export * from "./templates/generic-user";
export * from "./templates/welcome-user";
export * from "./templates/account-activated";
export * from "./templates/password-reset";
