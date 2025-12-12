const express = require('express');
const User = require('../models/userModel');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by username
router.get('/username/:username', async (req, res) => {
  try {
    const user = await User.getByUsername(req.params.username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ id: user.id, username: user.username, email: user.email, created_at: user.created_at });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email and password are required' });
    }
    // Check if username already exists
    const existingUserByUsername = await User.getByUsername(username);
    if (existingUserByUsername) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    // Check if email already exists
    const existingUserByEmail = await User.getByEmail(email);
    if (existingUserByEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const id = await User.create(username, email, password);
    const newUser = await User.getById(id);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({ error: 'Username and email are required' });
    }
    const updated = await User.update(req.params.id, username, email);
    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }
    const updatedUser = await User.getById(req.params.id);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await User.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;