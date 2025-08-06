import express from 'express';
import Role from '../models/Role.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = express.Router();

// 🆕 Create Role
router.post('/roles', authenticate, authorize('can-create-roles'), async (req, res) => {
  const role = new Role(req.body);
  await role.save();
  res.json(role);
});

// 🆕 Admin Setup
router.post('/setup-admin', async (req, res) => {
  try {
    let role = await Role.findOne({ name: 'admin' });
    if (!role) {
      role = new Role({
        name: 'admin',
        permissions: [{ key: '*', action: '*', resource: '*' }],
      });
      await role.save();
    }

    let user = await User.findOne({ username: 'admin' });
    if (!user) {
      user = new User({ username: 'admin', password: 'admin@123', role: role._id });
      await user.save();
    } else {
      user.role = role._id;
      await user.save();
    }

    res.json({ msg: '✅ Admin role and user setup complete', user });
  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ msg: 'Setup failed' });
  }
});

// 🆕 Get All Roles
router.get('/roles', authenticate, authorize('can-read-roles'), async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
});

// 🆕 Update Role
router.put('/roles/:id', authenticate, authorize('can-update-roles'), async (req, res) => {
  const { name, permissions } = req.body;
  const role = await Role.findByIdAndUpdate(req.params.id, { name, permissions }, { new: true });
  res.json(role);
});

// 🆕 Create User
router.post('/users', authenticate, authorize('can-create-users'), async (req, res) => {
  const { username, role } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const user = new User({
    username,
    password: 'user@123',
    role,
  });

  await user.save();
  res.json({ msg: 'User created successfully', user });
});

export default router;
