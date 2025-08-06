import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography, CircularProgress, Box, Button, Dialog,
  DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import useData from './data';
import { updateNote, deleteNote ,createNote} from '../../services/noteService';
import { hasPermission } from '../../utility/hasPermission';
import ActionsMenu from './ActionsMenu';
import CreateNoteModal from '../../components/modals/CreateNoteModal';
import { resources ,Actions} from '../../utility/hasPermission';
import { useAuth } from '../../context/AuthContext';
import { useHasRole } from '../../utility/permissions';
const Dashboard = () => {
  const navigate = useNavigate();
  const { error, loading, notes } = useData();
  const isAdmin=useHasRole(resources.ADMIN)

  const [noteList, setNoteList] = useState(notes);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({ title: '', content:'' });
  const [openModal, setOpenModal] = useState(false);
  const [noteBeingEdited, setNoteBeingEdited] = useState(null);
  
  useEffect(() => {
    setNoteList(notes);
  }, [notes]);

  const handleEdit = (note) => {
    setEditingNote(note);
    setNoteBeingEdited(note);

    setOpenModal(!openModal)
    setFormData({ title: note.title, content: note?.content });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        setNoteList(noteList.filter(n => n._id !== id));
      } catch (err) {
        alert('Failed to delete note');
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const updated = await updateNote(editingNote._id, formData);
      setNoteList(noteList.map(n => (n._id === updated._id ? updated : n)));
      setEditingNote(null);
    } catch (err) {
      alert('Failed to update note');
    }
  };

  const handleOpenCreate = () => {
    setNoteBeingEdited(null);
    setOpenModal(true);
  };
  
  const handleOpenEdit = (note) => {
    setNoteBeingEdited(note);
    setOpenModal(true);
  };
  const { user } = useAuth(); // user from context

  const readPermission =hasPermission(user?.permissions,Actions.READ,resources.PATIENT)
  const writePermission =hasPermission(user?.permissions,Actions.WRITE,resources.PATIENT)
  const updatePermission =hasPermission(user?.permissions,Actions.UPDATE,resources.PATIENT)
  const deletePermission =hasPermission(user?.permissions,Actions.DELETE,resources.PATIENT)

const handleSaveNote = async (noteData) => {
  try {
    if (noteBeingEdited) {
      const updated = await updateNote(noteBeingEdited._id, noteData);
      setNoteList(noteList.map(n => (n._id === updated._id ? updated : n)));
    } else {
      const created = await createNote(noteData); // Make sure this hits your backend
      setNoteList([...noteList, created]);
    }
    setOpenModal(false);
  } catch (error) {
    alert('Failed to save note');
  }
};

  
  return (
    <Box p={4} mt={5}>
      <Typography variant="h4">Welcome to Admin Dashboard</Typography>
      <ActionsMenu />

      {isAdmin && <ActionsMenu />}
      <Box mt={4}>
        <Typography variant="h5" mb={2}>All Notes</Typography>

{writePermission && (
 <Button variant="contained" onClick={() => setOpenModal(true)}>
 Create Note
</Button> 
)}
       
               {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">Failed to load notes</Typography>
        ) : noteList.length === 0 ? (
          <Typography>No notes found</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {noteList.map((note) => (
                <TableRow key={note._id}>
                  <TableCell>{note.title}</TableCell>
                  <TableCell>{note.content}</TableCell>
                  <TableCell>{note.createdBy?.name || 'N/A'}</TableCell>
                  <TableCell>
                    {updatePermission && (
 <Button variant="outlined" color="primary" onClick={() => handleEdit(note)} size="small" sx={{ mr: 1 }}>
 Edit
</Button>
                    )}
                   {
                    deletePermission && (
<Button variant="outlined" color="error" onClick={() => handleDelete(note._id)} size="small">
                      Delete
                    </Button>
                    )
                   }
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
           <CreateNoteModal
         open={openModal}
         handleClose={() => setOpenModal(false)}
         handleSave={handleSaveNote}
         existingNote={noteBeingEdited}
      />
      </Box>
   
      {/* Edit Note Modal */}
      {/* <Dialog open={!!editingNote} onClose={() => setEditingNote(null)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Note</DialogTitle>
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
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, content e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingNote(null)} color="secondary">Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog> */}

    </Box>
  );
};

export default Dashboard;
