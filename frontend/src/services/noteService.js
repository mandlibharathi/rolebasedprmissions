import API from './api'

export const getAllNotes = async () => {
  try {
    const response = await API.get('/fetch-notes');
    return response.data || [];
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    throw error;
  }
};
export const updateNote = async (id, updatedData) => {
    const response = await API.post(`/update-note/${id}`, updatedData);
    return response.data;
  };
  
  export const deleteNote = async (id) => {
    const response = await API.delete(`/delete-note/${id}`);
    return response.data;
  };

  export const createNote = async (noteData) => {
    const response = await API.post('/create-note', noteData);
    return response.data;
  };
  
  // import { useNavigate } from 'react-router-dom';

const logout = async () => {
  try {
    await API.post('/api/logout');
    // localStorage.clear();
    // navigate('/login'); // Use React Router navigation
  } catch (err) {
    console.error(err);
  }
};
