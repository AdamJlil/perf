const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');

// Route to handle contact form submissions
router.post('/submit', async (req, res) => {
  try {
    const contactData = req.body;
    console.log('Received contact form submission:', contactData);
    
    // Validate required fields
    if (!contactData || !contactData.name || !contactData.email || !contactData.message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields. Please provide name, email, and message.' 
      });
    }
    
    // Format contact data to match payment notification structure
    const formattedData = {
      email: contactData.email,
      name: contactData.name,
      first_name: '',  // Not available in contact form
      userType: 'CONTACT_FORM',
      plan: 'N/A',
      price: '0',
      paymentMethod: 'N/A',
      orderDate: new Date().toISOString(),
      // Add the message as a special field
      contactMessage: contactData.message
    };
    
    // Send email notification using the payment notification service
    const emailResult = await emailService.sendPaymentNotification(formattedData);
    
    if (emailResult && emailResult.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Contact form submitted successfully',
        adminMessageId: emailResult.adminMessageId,
        userMessageId: emailResult.userMessageId
      });
    } else {
      console.error('Failed to send contact form email:', emailResult.error || 'Unknown error');
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send contact form email',
        error: emailResult.error || 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Error in contact form submission route:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error processing contact form',
      error: error.message
    });
  }
});

module.exports = router;
