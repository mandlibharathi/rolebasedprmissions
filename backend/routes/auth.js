import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticate } from '../middleware/auth.js';
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password are required' });
    }

    // Find user and populate role
    const user = await User.findOne({ username }).populate('role');

    // ✅ Check before accessing password
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials (user not found)' });
    }


    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credentials (wrong password)' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send response
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role?.name || null,
        permissions: user.role?.permissions || [],
      },
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: 'Server error during login' });
  }
});

router.post('/logout', (req, res) => {
  res.status(200).json({ msg: 'Logout successful' });
});


router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('role');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        username: user.username,
        role: user.role?.name || null,
        permissions: user.role?.permissions || [],
      }
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ msg: 'Server error fetching user data' });
  }
});

export default router;
