import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { seedRoles } from './initRole.js';
import { createDefaultAdmin } from './initAdmin.js'; // ✅ now it exists

import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import notesRoutes from './routes/noteRoutes.js'
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    // await seedRoles();          // Seed roles first
    // await createDefaultAdmin(); // Then create admin user
  });


app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api',notesRoutes)


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
