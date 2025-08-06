import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField
} from '@mui/material';

const CreateNoteModal = ({ open, handleClose, handleSave, existingNote }) => {
  const [formData, setFormData] = useState({
    title: existingNote?.title || '',
    content: existingNote?.content || '',
  });

  // Update formData when existingNote changes (for editing)
  React.useEffect(() => {
    if (existingNote) {
      setFormData({
        title: existingNote.title,
        content: existingNote.content,
      });
    } else {
      setFormData({
        title: '',
        content: '',
      });
    }
  }, [existingNote]);

  const onSave = () => {
    handleSave(formData);
    setFormData({ title: '', content: '' });
  };

  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>{existingNote ? 'Edit Note' : 'Create Note'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={onSave} variant="contained" color="primary">
          {existingNote ? 'Update' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNoteModal;
