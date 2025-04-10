const express = require('express');
const router = express.Router();
const User = require('../models/User');
const JWTUtil = require('../utils/jwt');

// Middleware to verify JWT token and admin access
const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = JWTUtil.verifyToken(token);
    
    // Check if user is admin
    if (decoded.type !== 'ADMIN') {
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all customers for admin dashboard
router.get('/customers', verifyAdminToken, async (req, res) => {
  try {
    // Use the new method from User model
    const customers = await User.getAllCustomersForAdmin();
    
    // Map each user to the desired format
    const formattedCustomers = customers.map(user => {
      // Parse plan data if it exists
      let planData = null;
      if (user.plan) {
        try {
          planData = JSON.parse(user.plan);
        } catch (e) {
          planData = user.plan;
        }
      }

      // Debug the paid value
      console.log(`User ${user.id} paid value: ${user.paid} (type: ${typeof user.paid})`);
      
      // Convert paid value properly
      let paidValue = null;
      if (user.paid === 1 || user.paid === '1' || user.paid === true) {
        paidValue = true;
      } else if (user.paid === 0 || user.paid === '0' || user.paid === false) {
        paidValue = false;
      }
      
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        firstName: user.first_name,
        lastName: user.last_name,
        type: user.type,
        age: user.age,
        height: user.height,
        gender: user.gender,
        allergies: user.has_allergies ? user.allergies_details : null,
        medicalConditions: user.has_medical_conditions ? user.medical_conditions_details : null,
        details: null, // You can add any additional details here if needed
        createdAt: user.created_at,
        plan: planData,
        paid: paidValue
      };
    });
    
    res.json(formattedCustomers);
  } catch (error) {
    console.error('Error fetching customers for admin dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

module.exports = router;
