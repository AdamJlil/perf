const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');

// Route to handle payment notifications and send emails
router.post('/notify', async (req, res) => {
  try {
    const paymentData = req.body;
    console.log('Received payment notification:', paymentData);
    
    // Validate required fields
    if (!paymentData) {
      return res.status(400).json({ success: false, message: 'Missing payment data' });
    }
    
    // Ensure all fields have default values if missing
    const sanitizedData = {
      email: paymentData.email || '',
      name: paymentData.name || '',
      first_name: paymentData.first_name || '',
      plan: paymentData.plan || '',
      price: paymentData.price || '',
      address: paymentData.address || '',
      city: paymentData.city || '',
      phone: paymentData.phone || '',
      shipping: paymentData.shipping || '',
      paymentMethod: paymentData.paymentMethod || 'unknown',
      orderDate: paymentData.orderDate || new Date().toISOString(),
      // Include custom payment message and bank info if available
      paymentMessage: paymentData.paymentMessage || '',
      bankInfo: paymentData.bankInfo || null
    };
    
    // Log the full sanitized data for debugging
    console.log('Sending sanitized data to email service:', JSON.stringify(sanitizedData, null, 2));
    
    // Send email notification
    const emailResult = await emailService.sendPaymentNotification(sanitizedData);
    
    if (emailResult && emailResult.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Payment notification emails sent successfully',
        adminMessageId: emailResult.adminMessageId,
        userMessageId: emailResult.userMessageId
      });
    } else {
      console.error('Failed to send email:', emailResult.error || 'Unknown error');
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send payment notification emails',
        error: emailResult.error || 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Error in payment notification route:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message || 'Unknown error' 
    });
  }
});

// Add a simple GET route for the payment page to test if the API is working
router.get('/test', (req, res) => {
  res.status(200).json({ success: true, message: 'Payment API is working' });
});

// Add a debug route to log URL parameters
router.get('/debug', (req, res) => {
  console.log('Payment debug route accessed');
  console.log('Query parameters:', req.query);
  
  // Return the query parameters as JSON
  res.status(200).json({ 
    success: true, 
    message: 'Debug route accessed successfully',
    params: req.query
  });
});

// Route to handle payment status update notifications (when admin changes user's paid status)
router.post('/payment-status-update', async (req, res) => {
  try {
    const userData = req.body;
    console.log('Received payment status update notification request:', userData);
    
    // Validate required fields
    if (!userData || !userData.email) {
      return res.status(400).json({ success: false, message: 'Missing user data or email' });
    }
    
    // Send email notification for payment status update
    const emailResult = await emailService.sendPaymentStatusUpdateNotification(userData);
    
    if (emailResult && emailResult.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Payment status update notification emails sent successfully',
        adminMessageId: emailResult.adminMessageId,
        userMessageId: emailResult.userMessageId
      });
    } else {
      console.error('Failed to send payment status update emails:', emailResult.error || 'Unknown error');
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send payment status update notification emails',
        error: emailResult.error || 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Error in payment status update notification route:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message || 'Unknown error' 
    });
  }
});

module.exports = router;
