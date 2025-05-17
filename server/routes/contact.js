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
    
    // Send email notification using the dedicated contact form function
    const emailResult = await emailService.sendContactUsNotification(contactData);
    
    if (emailResult && emailResult.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Contact form submitted successfully',
        messageId: emailResult.messageId
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
    console.error('Error submitting contact form:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error submitting contact form',
      error: error.message 
    });
  }
});

// Route to handle plan cancellation requests
router.post('/plan-cancellation', async (req, res) => {
  try {
    const { userEmail, userName, userPlan, subject, message } = req.body;
    console.log('Received plan cancellation request:', { userEmail, userName });
    
    // Validate required fields
    if (!userEmail || !userName || !userPlan) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields. Please provide userEmail, userName, and userPlan.' 
      });
    }
    
    // Send cancellation request email to admin
    const emailResult = await emailService.sendPlanCancellationRequest({
      userEmail,
      userName,
      userPlan,
      subject: subject || `Plan Cancellation Request: ${userEmail}`,
      message: message || 'The user has requested to cancel their subscription plan.'
    });
    
    if (emailResult && emailResult.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Cancellation request submitted successfully',
        messageId: emailResult.messageId
      });
    } else {
      console.error('Failed to send cancellation request email:', emailResult.error || 'Unknown error');
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send cancellation request email',
        error: emailResult.error || 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Error submitting cancellation request:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error submitting cancellation request',
      error: error.message 
    });
  }
});

module.exports = router;
