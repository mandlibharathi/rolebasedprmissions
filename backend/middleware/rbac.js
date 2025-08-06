// middleware/rbac.js
import User from '../models/User.js';

export const authorize = (requiredPermissionKey) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).populate('role');

      if (!user) return res.status(401).json({ msg: 'User not found' });
      if (!user.role) return res.status(403).json({ msg: 'No role assigned' });

      const permissions = user.role.permissions || [];

      // Allow all if wildcard is present
      if (permissions.some((perm) => perm.key === '*' || perm.key === requiredPermissionKey)) {
        return next();
      }

      return res.status(403).json({ msg: 'Access denied: Missing permission' });
    } catch (err) {
      console.error('❌ Authorization error:', err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  };
};
