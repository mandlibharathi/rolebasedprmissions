import React, { useState } from 'react';
import { Button, Menu, MenuItem, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ActionsMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" p={2}>
      <Button variant="contained" onClick={handleOpen}>
        Actions
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => { navigate('/create-role'); handleClose(); }}>
          Create Role
        </MenuItem>
        <MenuItem onClick={() => { navigate('/create-user'); handleClose(); }}>
          Create User
        </MenuItem>
        <MenuItem onClick={() => { navigate('/edit-role'); handleClose(); }}>
          Edit Role
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ActionsMenu;
