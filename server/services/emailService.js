const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    // Create reusable transporter object using SMTP transport
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'perf.customerservice@gmail.com',
        pass: 'xxkn alvu zmbk guau'
      }
    });
  }

  /**
   * Send an email with contact form information
   * @param {Object} contactData - The contact form data
   * @returns {Promise} - Promise that resolves when email is sent
   */
  async sendContactFormEmail(contactData) {
    try {
      if (!contactData) {
        throw new Error('Contact data is required');
      }

      console.log('Contact form submission received:');
      console.log(JSON.stringify(contactData, null, 2));
      
      // Format date for email
      const submissionDate = new Date().toLocaleString();
      
      // Send email to customer service
      const mailOptions = {
        from: 'perf.customerservice@gmail.com',
        to: 'perf.customerservice@gmail.com',
        subject: `New Contact Form Submission from ${contactData.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Message:</strong></p>
          <p>${contactData.message}</p>
          <p><strong>Submission Date:</strong> ${submissionDate}</p>
        `
      };
      
      // Send email
      const result = await this.transporter.sendMail(mailOptions);
      
      return { 
        success: true, 
        messageId: result.messageId
      };
    } catch (error) {
      console.error('Error sending contact form email:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send a single email
   * @param {string} to - Recipient email address
   * @param {string} subject - Email subject
   * @param {string} htmlBody - Email HTML body content
   * @param {string} from - Sender email address (optional, defaults to customer service email)
   * @returns {Promise} - Promise that resolves with the message ID when email is sent
   */
  async sendEmail(to, subject, htmlBody, from = 'perf.customerservice@gmail.com') {
    try {
      if (!to || !subject || !htmlBody) {
        throw new Error('Recipient, subject, and body are required');
      }

      console.log(`Sending email to ${to} with subject: ${subject}`);
      
      const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: htmlBody
      };
      
      const result = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  }
  
  /**
   * Send an email with payment information
   * @param {Object} paymentData - The payment data from the form
   * @returns {Promise} - Promise that resolves when email is sent
   */
  /**
   * Send a custom notification email to multiple recipients
   * @param {string|string[]} receivers - Email address(es) of recipient(s)
   * @param {string} subject - Email subject
   * @param {string} body - Email HTML body content
   * @returns {Promise} - Promise that resolves when email is sent
   */
  async sendCustomNotification(receivers, subject, body) {
    try {
      if (!receivers || !subject || !body) {
        throw new Error('Receivers, subject, and body are required');
      }

      // Handle single receiver or array of receivers
      const to = Array.isArray(receivers) ? receivers.join(',') : receivers;
      
      console.log(`Sending custom notification to ${to}`);
      
      const result = await this.sendEmail(to, subject, body);
      return result;
    } catch (error) {
      console.error('Error sending custom notification:', error);
      return { success: false, error: error.message };
    }
  }

  async sendPaymentNotification(paymentData) {
    try {
      if (!paymentData) {
        throw new Error('Payment data is required');
      }

      console.log('Payment notification received:');
      console.log(JSON.stringify(paymentData, null, 2));
      
      // Extract user email from payment data
      const userEmail = paymentData.email;
      if (!userEmail) {
        throw new Error('User email is required');
      }
      
      // Format date for email
      const orderDate = new Date(paymentData.orderDate).toLocaleString();
      
      // Determine if this is a contact form submission or a payment notification
      const isContactForm = paymentData.userType === 'CONTACT_FORM';
      
      // Set appropriate subject and content based on the type
      const emailSubject = isContactForm ? 
        `New Contact Form Submission from ${paymentData.name}` : 
        'New Order Notification';
      
      // Create HTML content based on type
      let htmlContent = '';
      
      if (isContactForm) {
        htmlContent = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${paymentData.name}</p>
          <p><strong>Email:</strong> ${paymentData.email}</p>
          <p><strong>Message:</strong></p>
          <p>${paymentData.contactMessage}</p>
          <p><strong>Submission Date:</strong> ${orderDate}</p>
        `;
      } else {
        htmlContent = `
          <h2>New Order Received</h2>
          <p><strong>User:</strong> ${paymentData.first_name} ${paymentData.name}</p>
          <p><strong>Email:</strong> ${paymentData.email}</p>
          <p><strong>User Type:</strong> ${paymentData.userType}</p>
          <p><strong>Plan:</strong> ${paymentData.plan}</p>
          <p><strong>Price:</strong> ${paymentData.price} dh</p>
          <p><strong>Payment Method:</strong> ${paymentData.paymentMethod}</p>
          <p><strong>Order Date:</strong> ${orderDate}</p>
        `;
      }
      
      // Prepare user email based on type
      let userSubject = '';
      let userHtmlContent = '';
      
      if (isContactForm) {
        userSubject = 'Thank you for contacting PERF Fitness';
        userHtmlContent = `
          <h2>Thank you for contacting us!</h2>
          <p>Dear ${paymentData.name},</p>
          <p>We have received your message and will get back to you as soon as possible.</p>
          <p>Here's a copy of your message:</p>
          <p><em>${paymentData.contactMessage}</em></p>
          <p>Our team typically responds within 24-48 hours during business days.</p>
          <p>Thank you for your interest in PERF Fitness!</p>
          <p>Best regards,<br>PERF Fitness Team</p>
        `;
      } else {
        userSubject = 'Your PERF Fitness Order Confirmation';
        userHtmlContent = `
          <h2>Thank you for your order!</h2>
          <p>Dear ${paymentData.first_name} ${paymentData.name},</p>
          <p>We have received your order and it is being processed. Here are the details:</p>
          <p><strong>Plan:</strong> ${paymentData.plan}</p>
          <p><strong>Price:</strong> ${paymentData.price} dh</p>
          <p><strong>Payment Method:</strong> ${paymentData.paymentMethod}</p>
          <p><strong>Order Date:</strong> ${orderDate}</p>
          <p>Our team will contact you shortly with further instructions.</p>
          <p>Thank you for choosing PERF Fitness!</p>
          <p>Best regards,<br>PERF Fitness Team</p>
        `;
      }
      
      // Send emails using the generic sendEmail method
      const adminResult = await this.sendEmail(
        'perf.customerservice@gmail.com', 
        emailSubject, 
        htmlContent
      );
      
      const userResult = await this.sendEmail(
        userEmail, 
        userSubject, 
        userHtmlContent
      );
      
      return { 
        success: adminResult.success && userResult.success, 
        adminMessageId: adminResult.messageId,
        userMessageId: userResult.messageId
      };
    } catch (error) {
      console.error('Error processing payment notification:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new EmailService();
