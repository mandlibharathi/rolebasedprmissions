// setupAdmin.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Role from './models/Role.js';

dotenv.config();

export const createDefaultAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    let adminRole = await Role.findOne({ name: 'admin' });
    if (!adminRole) {
      console.log('❌ Admin role not found. Please seed roles first.');
      return process.exit(1);
    }

    let adminUser = await User.findOne({ username: 'admin' });
    if (!adminUser) {
      adminUser = new User({
        username: 'admin',
        password: 'admin@123', // will be hashed
        role: adminRole._id,
      });
      await adminUser.save();
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    process.exit(0);
  } catch (err) {
    console.error('❌ Admin setup error:', err.message);
    process.exit(1);
  }
};

