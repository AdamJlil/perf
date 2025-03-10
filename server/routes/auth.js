const express = require('express');
const router = express.Router();
const User = require('../models/User');
const JWTUtil = require('../utils/jwt');

// Input validation middleware
const validateSignupInput = (req, res, next) => {
    const { email, password, type } = req.body;
    
    if (!email || !password || !type) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if (!['ESTABLISHEMENT', 'PARTICULIER', 'ADMIN'].includes(type)) {
        return res.status(400).json({ error: 'Invalid user type' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    next();
};

// Signup route
router.post('/signup', validateSignupInput, async (req, res) => {
    try {
        const existingUser = await User.findByEmail(req.body.email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Extract user data from request body
        const userData = {
            email: req.body.email,
            password: req.body.password,
            type: req.body.type,
            first_name: req.body.first_name,
            name: req.body.name,
            plan: req.body.plan // Include plan data
        };

        const user = await User.create(userData);
        const token = JWTUtil.generateToken(user);

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                type: user.type,
                plan: user.plan // Include plan in response
            },
            token
        });
    } catch (error) {
        console.error('Signup error:', error);
        
        // Handle specific database errors
        if (error.message.includes('Database connection not established')) {
            return res.status(503).json({ 
                error: 'Service temporarily unavailable. Please try again later.',
                details: 'Database connection issue'
            });
        }
        
        if (error.message.includes('Database table not found')) {
            return res.status(503).json({ 
                error: 'Service temporarily unavailable. Please try again later.',
                details: 'Database setup issue'
            });
        }

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Email already exists' });
        }

        res.status(500).json({ 
            error: 'Internal server error',
            message: 'An unexpected error occurred while creating your account. Please try again later.'
        });
    }
});

// Signin route
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isValidPassword = await User.validatePassword(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = JWTUtil.generateToken(user);
        
        // Remove sensitive data and include quiz data
        const { 
            password: _, 
            ...userWithoutPassword 
        } = user;

        res.json({
            message: 'Login successful',
            user: {
                ...userWithoutPassword,
                age: user.age || null,
                height: user.height || null,
                weight: user.weight || null,
                gender: user.gender || null,
                has_allergies: user.has_allergies || false,
                allergies_details: user.allergies_details || null,
                has_medical_conditions: user.has_medical_conditions || false,
                medical_conditions_details: user.medical_conditions_details || null
            },
            token
        });
    } catch (error) {
        console.error('Signin error:', error);
        
        if (error.message.includes('Database connection not established')) {
            return res.status(503).json({ 
                error: 'Service temporarily unavailable. Please try again later.',
                details: 'Database connection issue'
            });
        }

        res.status(500).json({ 
            error: 'Internal server error',
            message: 'An unexpected error occurred while signing in. Please try again later.'
        });
    }
});

module.exports = router;
