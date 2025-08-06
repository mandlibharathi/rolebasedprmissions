import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { createUserByAdmin } from '../controllers/userController.js';
const router = express.Router();

router.post('/', protect, authorizeRoles('admin'), createUserByAdmin);

export default router;