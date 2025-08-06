import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, MenuItem } from '@mui/material';
import API from '../services/api';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    API.get('/admin/roles').then(res => setRoles(res.data));
  }, []);

  const handleSubmit = async () => {
    await API.post('/admin/users', { username, role: selectedRole });
    alert('User created with default password: user@123');
    setUsername('');
    setSelectedRole('');
  };

  return (
    <Box p={4}>
      <Typography variant="h5">Create User</Typography>
      <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth margin="normal" />
      <TextField
        select
        label="Select Role"
        value={selectedRole}
        onChange={e => setSelectedRole(e.target.value)}
        fullWidth
        margin="normal"
      >
        {roles.map(role => (
          <MenuItem key={role._id} value={role._id}>{role.name}</MenuItem>
        ))}
      </TextField>
      <Button variant="contained" onClick={handleSubmit}>Create User</Button>
    </Box>
  );
};

export default CreateUser;
