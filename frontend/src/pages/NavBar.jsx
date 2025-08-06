import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutScreen';

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>

        <Typography variant="h6"  sx={{ flexGrow: 1 }} component={Link} to='/dashboard' >
          Dashboard
        </Typography>

        <Box sx={{ display: 'flex', gap: 10 }}>
          {/* <Button color="inherit" component={Link} to="/dashboard">
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          <Button color="inherit" component={Link} to="/roles">
            Roles
          </Button> */}
          {/* <Button color="inherit" component={Link} to="/logout">
            Logout
          </Button> */}
          <LogoutButton />
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
