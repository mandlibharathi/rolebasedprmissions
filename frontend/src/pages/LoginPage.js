import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
const {setUser}=useAuth()

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { username, password });
      localStorage.setItem("token", res.data.token);
    //  localStorage.setItem("user", JSON.stringify(res.data.user));
    setUser(res.data.user)
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
      <Typography variant="h5">Admin Login</Typography>
      <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} margin="normal" />
      <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} margin="normal" />
      <Button variant="contained" onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default LoginPage;
