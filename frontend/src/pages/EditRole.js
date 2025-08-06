import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  MenuItem,
  Select,
  Paper,
  Divider,
  Switch,
  FormControlLabel
} from '@mui/material';
import API from '../services/api';

const resources = ['patients', 'appointments', 'users', 'roles'];
const actions = ['read', 'write', 'update', 'delete', 'create'];

const EditRole = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get('/admin/roles')
      .then((res) => setRoles(res.data))
      .catch((err) => {
        console.error('Error fetching roles:', err);
        alert('❌ Failed to load roles');
      });
  }, []);

  const handleRoleSelect = (roleId) => {
    const role = roles.find((r) => r._id === roleId);
    if (role) {
      setSelectedRoleId(role._id);
      setRoleName(role.name);

      // Transform flat permission array to resource-based map
      const groupedPermissions = {};
      for (const perm of role.permissions || []) {
        const { action, resource } = perm;
        if (!groupedPermissions[resource]) groupedPermissions[resource] = [];
        groupedPermissions[resource].push(action);
      }
      setPermissions(groupedPermissions);
    }
  };

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

  const handleSubmit = async () => {
    if (!selectedRoleId || !roleName.trim()) {
      alert('❗Please select a role and enter a name');
      return;
    }

    setLoading(true);
    try {
      await API.put(`/admin/roles/${selectedRoleId}`, buildPayload());
      alert('✅ Role updated successfully');
    } catch (err) {
      console.error('Error updating role:', err);
      alert('❌ Failed to update role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      p={4}
      maxWidth={700}
      mx="auto"
      mt={5}
      component={Paper}
      elevation={3}
      borderRadius={2}
    >
      <Typography variant="h5" gutterBottom>
        Edit Role
      </Typography>

      <Select
        value={selectedRoleId}
        onChange={(e) => handleRoleSelect(e.target.value)}
        displayEmpty
        fullWidth
        sx={{ my: 2 }}
      >
        <MenuItem value="" disabled>
          -- Select a Role --
        </MenuItem>
        {roles.map((role) => (
          <MenuItem key={role._id} value={role._id}>
            {role.name}
          </MenuItem>
        ))}
      </Select>

      <TextField
        label="Role Name"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
        fullWidth
        margin="normal"
        disabled={!selectedRoleId}
      />

      {selectedRoleId && (
        <>
          <Typography variant="h6" mt={3} gutterBottom>
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

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Role'}
          </Button>
        </>
      )}
    </Box>
  );
};

export default EditRole;
