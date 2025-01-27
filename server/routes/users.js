const express = require('express');
const router = express.Router();
const User = require('../models/User');
const JWTUtil = require('../utils/jwt');

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = JWTUtil.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Get all PARTICULIER users
router.get('/particulier', async (req, res) => {
  try {
    const users = await User.getAllParticularUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching PARTICULIER users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Update user quiz data
router.post('/quiz', verifyToken, async (req, res) => {
  try {
    const {
      age,
      height,
      weight,
      gender,
      hasAllergies,
      allergiesDetails,
      hasMedicalConditions,
      medicalConditionsDetails
    } = req.body;

    // Get user from JWT token
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(401).json({ error: 'You must be logged in to update your profile' });
    }

    // Update user in database using the User instance
    await User.updateUserQuiz(currentUser.id, {
      age: parseInt(age),
      height: parseInt(height),
      weight: parseInt(weight),
      gender,
      has_allergies: hasAllergies,
      allergies_details: allergiesDetails || null,
      has_medical_conditions: hasMedicalConditions,
      medical_conditions_details: medicalConditionsDetails || null
    });

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user quiz:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get establishment's customers
router.get('/customers', verifyToken, async (req, res) => {
  try {
    // Verify that the user is an establishment
    if (req.user.type !== 'ESTABLISHEMENT') {
      return res.status(403).json({ error: 'Only establishments can view their customers' });
    }

    const establishmentId = req.user.id;
    const customers = await User.getCustomers(establishmentId);
    res.json(customers);
  } catch (error) {
    console.error('Error getting customers:', error);
    res.status(500).json({ error: 'Failed to get customers' });
  }
});

// Remove customer from establishment
router.delete('/customers/remove/:customerId', verifyToken, async (req, res) => {
  try {
    console.log('Remove customer request:', {
      customerId: req.params.customerId,
      establishmentId: req.user.id,
      userType: req.user.type
    });

    // Verify that the user is an establishment
    if (req.user.type !== 'ESTABLISHEMENT') {
      return res.status(403).json({ error: 'Only establishments can remove customers' });
    }

    const { customerId } = req.params;
    const establishmentId = req.user.id;

    const customers = await User.removeCustomer(establishmentId, customerId);
    res.json({ message: 'Customer removed successfully', customers });
  } catch (error) {
    console.error('Error removing customer:', error);
    res.status(500).json({ error: 'Failed to remove customer' });
  }
});

// Delete user by ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verify that the user has permission to delete
    if (req.user.type !== 'ESTABLISHEMENT' && req.user.type !== 'ADMIN') {
      return res.status(403).json({ error: 'You do not have permission to delete users' });
    }

    await User.deleteUser(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Add customer to establishment
router.post('/customers/add/:customerId', verifyToken, async (req, res) => {
  try {
    console.log('Add customer request:', {
      customerId: req.params.customerId,
      establishmentId: req.user.id,
      userType: req.user.type,
      body: req.body
    });

    // Verify that the user is an establishment
    if (req.user.type !== 'ESTABLISHEMENT') {
      return res.status(403).json({ error: 'Only establishments can add customers' });
    }

    const { customerId } = req.params;
    const establishmentId = req.user.id;
    const customerData = req.body;

    // The customer data should already be in the correct format
    const customer = {
      ...customerData,
      et_customer_id: customerId // Ensure the ID is set correctly
    };

    console.log('Processed customer data:', customer);

    const customers = await User.addCustomer(establishmentId, customer);
    console.log('Response customers:', customers);

    res.json({ message: 'Customer added successfully', customers });
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ error: 'Failed to add customer', details: error.message });
  }
});

module.exports = router;
