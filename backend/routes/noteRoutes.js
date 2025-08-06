import express from 'express';
import {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
} from '../controllers/noteCotroller.js';
import { protect } from '../middleware/authMiddleware.js'; // assumes you have JWT auth

const router = express.Router();

// Create Note
router.post('/create-note', protect, createNote);

// Get All Notes of logged-in user
router.get('/fetch-notes', protect, getAllNotes);

// Get Single Note by ID
router.get('/get-single-note/:id', protect, getNoteById);

// Update Note by ID
router.post('/update-note/:id', protect, updateNote);

// Delete Note by ID
router.delete('/delete-note/:id', protect, deleteNote);

export default router;
