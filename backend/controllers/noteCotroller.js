import Note from '../models/Notes.js';

// Create Note
export const createNote = async (req, res) => {
  const { title, content, tags } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  // Check if a note with the same title already exists for the user
  const existingNote = await Note.findOne({ title, createdBy: req.user._id });
  if (existingNote) {
    return res.status(409).json({ message: 'Note with this title already exists' });
  }
  const note = new Note({
    title,
    content,
    tags,
    createdBy: req.user._id,
  });

  
  const savedNote = await note.save();
  res.status(201).json(savedNote);
};

// Get All Notes of User
export const getAllNotes = async (req, res) => {
  //{ createdBy: req.user._id }
  const notes = await Note.find().sort({ updatedAt: -1 });
  res.json(notes);
};

// Get Single Note
export const getNoteById = async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, createdBy: req.user._id });
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
};

// Update Note
export const updateNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    { title, content, tags },
    { new: true, runValidators: true }
  );
  if (!note) return res.status(404).json({ message: 'Note not found or unauthorized' });
  res.json(note);
};

// Delete Note
export const deleteNote = async (req, res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id });
  if (!note) return res.status(404).json({ message: 'Note not found or unauthorized' });
  res.json({ message: 'Note deleted successfully' });
};
