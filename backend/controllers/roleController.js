import Role from '../models/Role.js';

export const createRole = async (req, res) => {
  const { name, permissions } = req.body;
  try {
    const roleExists = await Role.findOne({ name });
    if (roleExists) return res.status(400).json({ message: 'Role already exists' });

    const role = new Role({ name, permissions });
    await role.save();

    res.status(201).json({ message: 'Role created successfully', role });
  } catch (err) {
    res.status(500).json({ message: 'Role creation failed' });
  }
};

export const getRoles = async (req, res) => {
  try {
    // If permissions are references, use .populate('permissions')
    const roles = await Role.find().populate('permissions');
    
    res.status(200).json(roles);
  } catch (err) {
    console.error('Error fetching roles:', err);
    res.status(500).json({ message: 'Failed to fetch roles' });
  }
};

