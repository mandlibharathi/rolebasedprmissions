import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { createRole, getRoles } from '../controllers/roleController.js';
const router = express.Router();

router.post('/', protect, authorizeRoles('admin'), createRole);
router.get('/', protect, authorizeRoles('admin'), getRoles);

export default router;