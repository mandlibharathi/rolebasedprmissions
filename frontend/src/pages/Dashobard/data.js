// src/hooks/useData.js
import { useEffect, useState } from 'react';
import { getAllNotes } from '../../services/noteService';
const useData = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedNotes = await getAllNotes(token);
        setNotes(fetchedNotes);
      } catch (err) {
        setError(err);
        console.error('Error in useData:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { notes, loading, error };
};

export default useData;
