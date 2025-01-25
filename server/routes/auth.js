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

        const user = await User.create(req.body);
        const token = JWTUtil.generateToken(user);

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                type: user.type
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
        
        // Remove sensitive data before sending response
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            message: 'Login successful',
            user: userWithoutPassword,
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
