import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Role from './models/Role.js'; // adjust path if needed

dotenv.config();

const roles = [
  {
    name: 'admin',
    permissions: [
      { key: 'can-read-users', action: 'read', resource: 'users' },
      { key: 'can-create-users', action: 'create', resource: 'users' },
      { key: 'can-update-users', action: 'update', resource: 'users' },
      { key: 'can-delete-users', action: 'delete', resource: 'users' },
      { key: 'can-read-roles', action: 'read', resource: 'roles' },
      { key: 'can-create-roles', action: 'create', resource: 'roles' },
      { key: 'can-update-roles', action: 'update', resource: 'roles' },
      { key: 'can-delete-roles', action: 'delete', resource: 'roles' },
      { key: 'can-read-patients', action: 'read', resource: 'patients' },
      { key: 'can-create-prescriptions', action: 'create', resource: 'prescriptions' },
    ],
  },
  {
    name: 'doctor',
    permissions: [
      { key: 'can-read-patients', action: 'read', resource: 'patients' },
      { key: 'can-create-prescriptions', action: 'create', resource: 'prescriptions' },
      { key: 'can-create-users', action: 'create', resource: 'users' },
    ],
  },
  {
    name: 'nurse',
    permissions: [
      { key: 'can-read-patients', action: 'read', resource: 'patients' },
    ],
  },
  {
    name: 'attender',
    permissions: [
      { key: 'can-read-patients', action: 'read', resource: 'patients' },
    ],
  },
];

export const seedRoles = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Role.deleteMany(); // optional: remove previous roles
    const inserted = await Role.insertMany(roles);
    console.log('✅ Seeded roles:', inserted.map(r => r.name));
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

