const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all PARTICULIER users
router.get('/api/users/particulier', async (req, res) => {
  try {
    const users = await User.getAllParticularUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching PARTICULIER users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Delete user by ID
router.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.deleteUser(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
