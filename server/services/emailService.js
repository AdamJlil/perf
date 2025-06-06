const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    // Create reusable transporter object using SMTP transport for Zoho
    this.transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: 'contact@perf.ma',
        pass: 'jVh2Ex9dmQFd' // App-specific password for PERF application
      }
    });
  }

  /**
   * Send an email with contact form information
   * @param {Object} contactData - The contact form data
   * @returns {Promise} - Promise that resolves when email is sent
   */
  /**
   * Send an email for contact us form
   * @param {Object} contactData - The contact form data
   * @returns {Promise}
   */
  async sendContactUsNotification(contactData) {
    try {
      if (!contactData || !contactData.name || !contactData.email || !contactData.message) {
        throw new Error('Missing contact form fields');
      }

      const submissionDate = new Date().toLocaleString();
      const mailOptions = {
        from: 'contact@perf.ma',
        to: 'contact@perf.ma',
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

      const result = await this.transporter.sendMail(mailOptions);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending contact form email:', error);
      return { success: false, error: error.message };
    }
  }

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
        from: 'contact@perf.ma',
        to: 'contact@perf.ma',
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
  async sendEmail(to, subject, htmlBody, from = 'contact@perf.ma') {
    try {
      if (!to || !subject || !htmlBody) {
        throw new Error('Recipient, subject, and body are required');
      }

      console.log(`Sending email to ${to}`);
      
      const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: htmlBody
      };
      
      const result = await this.transporter.sendMail(mailOptions);
      
      return { 
        success: true, 
        messageId: result.messageId
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  }
  
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
      
      // Convert single email to array for consistency
      const to = Array.isArray(receivers) ? receivers : [receivers];
      
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
        // Create admin notification with payment details and bank info if applicable
        htmlContent = `
          <h2>New Order Received</h2>
          <p><strong>User:</strong> ${paymentData.first_name} ${paymentData.name}</p>
          <p><strong>Email:</strong> ${paymentData.email}</p>
          <p><strong>Address:</strong> ${paymentData.address}</p>
          <p><strong>City:</strong> ${paymentData.city}</p>
          <p><strong>Phone:</strong> ${paymentData.phone}</p>
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
        // Use the custom payment message if provided, otherwise fallback to default
        if (paymentData.paymentMessage) {
          console.log('Using custom payment message');
          
          userSubject = paymentData.paymentMethod === 'bank' ? 
            'PERF Fitness - Bank Transfer Instructions' : 
            'PERF Fitness - Order Confirmation';
            
          // Convert the plain text payment message to HTML
          const formattedMessage = paymentData.paymentMessage
            .split('\n')
            .map(line => line.trim() ? `<p>${line}</p>` : '<br>')
            .join('');
            
          userHtmlContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #e86c02;">PERF Fitness - Order Confirmation</h2>
              ${formattedMessage}
            </div>
          `;
        } else {
          userSubject = 'Your PERF Fitness Order Confirmation';
          userHtmlContent = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #e86c02; text-align: center; margin-bottom: 25px;">Welcome to Your PERF Fitness Journey</h2>
              
              <p style="margin-bottom: 20px;">Dear ${paymentData.first_name} ${paymentData.name},</p>
              
              <p style="margin-bottom: 15px;">Thank you for choosing PERF Fitness as your partner in achieving your wellness goals. We are delighted to welcome you to our community of dedicated fitness enthusiasts.</p>
              
              <p style="margin-bottom: 15px;">We are pleased to confirm that we have received your order for the <strong style="color: #e86c02;">${paymentData.plan}</strong> plan, and we are excited to begin this transformative journey with you.</p>
              
              <div style="background-color: #f8f8f8; padding: 20px; border-left: 4px solid #e86c02; margin: 25px 0;">
                <p style="font-weight: bold; margin-bottom: 10px;">Your Order Details:</p>
                <p style="margin: 5px 0;"><strong>Plan:</strong> ${paymentData.plan}</p>
                <p style="margin: 5px 0;"><strong>Investment:</strong> ${paymentData.price} dh</p>
                <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${paymentData.paymentMethod === 'bank' ? 'Bank Transfer' : 'Cash on Delivery'}</p>
                <p style="margin: 5px 0;"><strong>Date:</strong> ${orderDate}</p>
              </div>
              
              <p style="margin-bottom: 15px;">In the coming days, our dedicated team will reach out to you personally to ensure you have everything you need to maximize your PERF experience. We are committed to providing you with exceptional service and support throughout your fitness journey.</p>
              
              <p style="margin-bottom: 15px;">Should you have any questions or need assistance in the meantime, please don't hesitate to contact our customer care team, who are always ready to help.</p>
              
              <p style="margin-bottom: 15px;">We look forward to being part of your fitness success story.</p>
              
              <p style="margin-bottom: 10px;">With warm regards,</p>
              
              <p style="margin-bottom: 25px;">The PERF Fitness Team</p>
              
              <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #777;">
                <p>&copy; ${new Date().getFullYear()} PERF Fitness. All rights reserved.</p>
              </div>
            </div>
          `;
        }
      }
      
      // Send emails using the generic sendEmail method
      const adminResult = await this.sendEmail(
        'contact@perf.ma', 
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

  /**
   * Send notifications when payment status is updated from Unpaid to Paid by an admin
   * @param {Object} userData - The user data including email, name, plan details, etc.
   * @returns {Promise} - Promise that resolves when emails are sent
   */
  async sendPaymentStatusUpdateNotification(userData) {
    try {
      if (!userData || !userData.email) {
        throw new Error('User data with email is required');
      }

      console.log('Payment status update notification for user:', userData.email);
      
      // Extract user information
      const userEmail = userData.email;
      const firstName = userData.first_name || '';
      const lastName = userData.name || '';
      const fullName = `${firstName} ${lastName}`.trim();
      
      // Parse plan information if it exists
      let planTitle = 'your subscription plan';
      let planDetails = '';
      let startDate = '';
      let endDate = '';
      
      if (userData.plan) {
        try {
          const planData = typeof userData.plan === 'string' ? 
            JSON.parse(userData.plan) : userData.plan;
            
          planTitle = planData.title || 'your subscription plan';
          
          // Get plan duration based on plan title
          let duration = '';
          if (planTitle === 'ESSENTIAL') duration = '3 months';
          else if (planTitle === 'PREMIUM') duration = '6 months';
          else if (planTitle === 'GROWTH') duration = '1 year';
          
          // Extract start and end dates from plan data
          startDate = planData.start_date || '';
          endDate = planData.end_date || '';
          
          // Format the dates if they exist
          const formatDate = (dateStr) => {
            if (!dateStr) return '';
            try {
              return new Date(dateStr).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
            } catch (e) {
              console.error('Error formatting date:', e);
              return dateStr;
            }
          };
          
          const formattedStartDate = formatDate(startDate);
          const formattedEndDate = formatDate(endDate);
          
          // Add dates to plan details if available
          if (formattedStartDate && formattedEndDate) {
            planDetails = duration ? 
              `${planTitle} (${duration}) - From ${formattedStartDate} to ${formattedEndDate}` : 
              `${planTitle} - From ${formattedStartDate} to ${formattedEndDate}`;
          } else {
            planDetails = duration ? `${planTitle} (${duration})` : planTitle;
          }
        } catch (e) {
          console.error('Error parsing plan data:', e);
        }
      }
      
      // Current date for the email
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Create admin notification email
      const adminSubject = `Payment Confirmed: ${fullName} (${planTitle})`;
      const adminContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e86c02;">Payment Status Update</h2>
          <p>A user's payment status has been updated to <strong style="color: green;">Paid</strong>:</p>
          
          <div style="background-color: #f8f8f8; padding: 20px; border-left: 4px solid #e86c02; margin: 15px 0;">
            <p style="margin: 5px 0;"><strong>User:</strong> ${fullName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${userEmail}</p>
            <p style="margin: 5px 0;"><strong>Plan:</strong> ${planDetails}</p>
            <p style="margin: 5px 0;"><strong>Payment confirmed:</strong> ${currentDate}</p>
          </div>
          
          <p>The user has been notified that their payment is confirmed and that they can now access the platform.</p>
        </div>
      `;
      
      // Create user notification email with motivational message
      const userSubject = `Welcome to PERF - Your Journey Begins Now!`;
      const userContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e86c02; text-align: center; margin-bottom: 25px;">Your PERF Journey Begins Today!</h2>
          
          <p style="margin-bottom: 20px;">Dear ${fullName},</p>
          
          <p style="margin-bottom: 15px;">We are thrilled to inform you that your payment for the <strong style="color: #e86c02;">${planDetails}</strong> has been successfully processed and confirmed.</p>
          
          <div style="background-color: #f8f8f8; padding: 20px; border-left: 4px solid #e86c02; margin: 25px 0;">
            <p style="font-weight: bold; margin-bottom: 10px; color: #e86c02;">🎉 Your PERF Account is Now Fully Activated!</p>
            <p style="margin: 5px 0;">You now have complete access to our platform and all the premium features included in your plan.</p>
          </div>
          
          <p style="margin-bottom: 15px;">We're excited to welcome you to the PERF community, where your fitness journey will be transformed through our innovative approach to personal training and nutrition guidance.</p>
          
          <p style="margin-bottom: 15px;"><strong>Getting Started:</strong></p>
          <ul style="margin-bottom: 15px;">
            <li>Log in to your account at <a href="https://perf.ma" style="color: #e86c02;">perf.ma</a></li>
            <li>Complete your profile to personalize your experience</li>
            <li>Explore your customized workout and nutrition plans</li>
            <li>Connect with your dedicated personal trainer who will guide you throughout your journey</li>
          </ul>
          
          <p style="margin-bottom: 15px;">Remember, consistency is key to achieving lasting results. Your commitment, combined with our expertise, will lead to extraordinary transformations in your health and fitness.</p>
          
          <p style="margin-bottom: 15px;">If you have any questions or need assistance, our support team is always here to help you succeed.</p>
          
          <p style="margin-bottom: 15px;">We look forward to being part of your fitness success story and celebrating your achievements together!</p>
          
          <p style="margin-bottom: 10px;">With warm regards,</p>
          
          <p style="margin-bottom: 25px;">The PERF Fitness Team</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
            <p>&copy; ${new Date().getFullYear()} PERF Fitness. All rights reserved.</p>
          </div>
        </div>
      `;
      
      // Send emails using the generic sendEmail method
      const adminResult = await this.sendEmail(
        'contact@perf.ma', 
        adminSubject, 
        adminContent
      );
      
      const userResult = await this.sendEmail(
        userEmail, 
        userSubject, 
        userContent
      );
      
      return { 
        success: adminResult.success && userResult.success, 
        adminMessageId: adminResult.messageId,
        userMessageId: userResult.messageId
      };
    } catch (error) {
      console.error('Error sending payment status update notification:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send a plan cancellation request notification to admin
   * @param {Object} requestData - The cancellation request data
   * @returns {Promise} - Promise that resolves when email is sent
   */
  async sendPlanCancellationRequest(requestData) {
    try {
      if (!requestData || !requestData.userEmail || !requestData.userName || !requestData.userPlan) {
        throw new Error('Cancellation request data is incomplete');
      }

      console.log('Plan cancellation request received from:', requestData.userEmail);
      
      // Extract information
      const userEmail = requestData.userEmail;
      const userName = requestData.userName;
      let planDetails = 'Unknown Plan';
      
      // Parse plan information if it exists
      if (requestData.userPlan) {
        try {
          const planData = typeof requestData.userPlan === 'string' ? 
            JSON.parse(requestData.userPlan) : requestData.userPlan;
            
          // Format plan details
          const title = planData.title || 'Unknown';
          const price = planData.price ? `${planData.price} MAD` : 'N/A';
          const startDate = planData.start_date ? new Date(planData.start_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'Unknown';
          const endDate = planData.end_date ? new Date(planData.end_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'Unknown';
          
          planDetails = `${title} (${price}) - From ${startDate} to ${endDate}`;
        } catch (e) {
          console.error('Error parsing plan data:', e);
        }
      }
      
      // Current date for the email
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Create admin notification email
      const adminSubject = requestData.subject || `Plan Cancellation Request: ${userName}`;
      const adminContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e86c02;">Plan Cancellation Request</h2>
          <p>A user has requested to cancel their subscription plan:</p>
          
          <div style="background-color: #f8f8f8; padding: 20px; border-left: 4px solid #e86c02; margin: 15px 0;">
            <p style="margin: 5px 0;"><strong>User:</strong> ${userName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${userEmail}</p>
            <p style="margin: 5px 0;"><strong>Plan:</strong> ${planDetails}</p>
            <p style="margin: 5px 0;"><strong>Request Date:</strong> ${currentDate}</p>
          </div>
          
          <p>${requestData.message || 'The user has requested to cancel their subscription plan.'}</p>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
            <p><strong>Action Required:</strong> Please contact the user to discuss their cancellation request and take appropriate action.</p>
          </div>
        </div>
      `;
      
      // Send email to admin
      const result = await this.sendEmail('contact@perf.ma', adminSubject, adminContent);
      
      return result;
    } catch (error) {
      console.error('Error sending plan cancellation request:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send an order confirmation email to both user and admin
   * @param {Object} orderData - The order data
   * @returns {Promise} - Promise that resolves when emails are sent
   */
  async sendOrderConfirmation(orderData) {
    try {
      if (!orderData || !orderData.userEmail || !orderData.userName || !orderData.orderDetails) {
        throw new Error('Order data is incomplete');
      }

      console.log('Order confirmation received from:', orderData.userEmail);
      
      // Extract information
      const userEmail = orderData.userEmail;
      const userName = orderData.userName;
      let orderDetails = 'Unknown Order';
      
      // Parse order information if it exists
      if (orderData.orderDetails) {
        try {
          const orderInfo = typeof orderData.orderDetails === 'string' ? 
            JSON.parse(orderData.orderDetails) : orderData.orderDetails;
            
          // Format order details
          const orderNumber = orderInfo.order_number || 'Unknown';
          const orderDate = orderInfo.order_date ? new Date(orderInfo.order_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'Unknown';
          const totalPrice = orderInfo.total_price ? `${orderInfo.total_price} MAD` : 'N/A';
          const paymentMethod = orderInfo.payment_method || 'Unknown';
          
          orderDetails = `Order #${orderNumber} - ${orderDate} - ${totalPrice} - ${paymentMethod}`;
        } catch (e) {
          console.error('Error parsing order data:', e);
        }
      }
      
      // Current date for the email
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Create admin notification email
      const adminSubject = orderData.subject || `Order Confirmation: ${userName}`;
      const adminContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e86c02;">Order Confirmation</h2>
          <p>A new order has been placed:</p>
          
          <div style="background-color: #f8f8f8; padding: 20px; border-left: 4px solid #e86c02; margin: 15px 0;">
            <p style="margin: 5px 0;"><strong>User:</strong> ${userName}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${userEmail}</p>
            <p style="margin: 5px 0;"><strong>Order:</strong> ${orderDetails}</p>
            <p style="margin: 5px 0;"><strong>Order Date:</strong> ${currentDate}</p>
          </div>
          
          <p>${orderData.message || 'A new order has been placed.'}</p>
        </div>
      `;
      
      // Create user notification email
      const userSubject = `Your Order Confirmation: ${orderNumber}`;
      const userContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e86c02;">Your Order Confirmation</h2>
          <p>Dear ${userName},</p>
          <p>Thank you for your order!</p>
          <p>Your order details are as follows:</p>
          <div style="background-color: #f8f8f8; padding: 20px; border-left: 4px solid #e86c02; margin: 15px 0;">
            <p style="margin: 5px 0;"><strong>Order Number:</strong> ${orderNumber}</p>
            <p style="margin: 5px 0;"><strong>Order Date:</strong> ${orderDate}</p>
            <p style="margin: 5px 0;"><strong>Total Price:</strong> ${totalPrice}</p>
            <p style="margin: 5px 0;"><strong>Payment Method:</strong> ${paymentMethod}</p>
          </div>
          <p>If you have any questions or concerns, please don't hesitate to contact us.</p>
          <p>Thank you for your business!</p>
          <p>Best regards,<br>PERF Fitness Team</p>
        </div>
      `;
      
      // Send emails using the generic sendEmail method
      const adminResult = await this.sendEmail(
        'contact@perf.ma', 
        adminSubject, 
        adminContent
      );
      
      const userResult = await this.sendEmail(
        userEmail, 
        userSubject, 
        userContent
      );
      
      return { 
        success: adminResult.success && userResult.success, 
        adminMessageId: adminResult.messageId,
        userMessageId: userResult.messageId
      };
    } catch (error) {
      console.error('Error sending order confirmation:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new EmailService();
