import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Switch,
  FormControlLabel
} from '@mui/material';
import API from '../services/api';
const resources = ['patients', 'appointments', 'medications'];
const actions = ['read', 'write', 'update', 'delete'];

const CreateRole = () => {
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState({});

  const handleToggleAction = (resource, action, checked) => {
    setPermissions((prev) => {
      const current = prev[resource] || [];
      const updated = checked
        ? [...current, action]
        : current.filter((a) => a !== action);
      return { ...prev, [resource]: updated };
    });
  };

  const handleToggleAll = (resource, checked) => {
    setPermissions((prev) => ({
      ...prev,
      [resource]: checked ? [...actions] : [],
    }));
  };

  const buildPayload = () => {
    const permissionsPayload = [];

    for (const resource in permissions) {
      for (const action of permissions[resource]) {
        permissionsPayload.push({
          key: `can-${action}-${resource}`,
          action,
          resource,
        });
      }
    }

    return {
      name: roleName,
      permissions: permissionsPayload,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = buildPayload();

    try {
      await API.post('/admin/roles', payload);
      alert('✅ Role created successfully!');
      setRoleName('');
      setPermissions({});
    } catch (err) {
      console.error(err);
      alert('❌ Error creating role');
    }
  };

  return (
    <Box
      maxWidth={700}
      mx="auto"
      mt={5}
      p={4}
      component={Paper}
      elevation={3}
      borderRadius={2}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Create Role</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!roleName.trim()}
        >
          Create Role
        </Button>
      </Box>

      <TextField
        label="Role Name"
        variant="outlined"
        fullWidth
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Typography variant="h6" gutterBottom>
        Permissions
      </Typography>

      {resources.map((resource) => (
        <Box key={resource} mb={4}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="subtitle1">{resource.toUpperCase()}</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={(permissions[resource]?.length || 0) === actions.length}
                  onChange={(e) => handleToggleAll(resource, e.target.checked)}
                />
              }
              label="Toggle All"
            />
          </Box>

          {actions.map((action) => (
            <FormControlLabel
              key={action}
              control={
                <Switch
                  checked={permissions[resource]?.includes(action) || false}
                  onChange={(e) => handleToggleAction(resource, action, e.target.checked)}
                />
              }
              label={`Can ${action}`}
              sx={{ ml: 2 }}
            />
          ))}

          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default CreateRole;
