// LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout'); // Backend route
      localStorage.clear(); // Clear JWT or user info
      localStorage.removeItem('token')
      navigate('/');   // Redirect to login page
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
