import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    console.log('Received signup request:', req.body);
    const { email, name, phone, password, type } = req.body;

    // Validate required fields
    if (!email || !name || !phone || !password || !type) {
      console.log('Missing required fields:', { email, name, phone, type });
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already exists:', email);
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = new User({
      email,
      name,
      phone,
      password,
      type
    });

    await user.save();
    console.log('User created successfully:', user._id);

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        type: user.type
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});