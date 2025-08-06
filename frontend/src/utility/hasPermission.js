export function hasPermission(permissions, action, resource) {
  if (!Array.isArray(permissions)) return false;

  return permissions.some(
    (perm) => perm.action === action && perm.resource === resource
  );
}


export const resources ={
  ADMIN:'admin',
  NURSE:'nurse',
  DOCTOR:'doctor',
  ATTENDER:'attender',
  PATIENT:'patients',
  User:'users'
}

 export const Actions={
  READ:'read',
  WRITE:'write',
  UPDATE:'update',
  DELETE:'delete'

 }

