import { UserRole } from '@/types/database.types';

export type Permission =
  | 'system:manage'
  | 'articles:read'
  | 'articles:write'
  | 'articles:delete'
  | 'categories:manage'
  | 'media:upload'
  | 'media:delete'
  | 'settings:manage'
  | 'users:manage'
  | 'audit:read';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: [
    'system:manage',
    'articles:read',
    'articles:write',
    'articles:delete',
    'categories:manage',
    'media:upload',
    'media:delete',
    'settings:manage',
    'users:manage',
    'audit:read',
  ],
  admin: [
    'articles:read',
    'articles:write',
    'articles:delete',
    'categories:manage',
    'media:upload',
    'media:delete',
    'settings:manage',
    'users:manage',
    'audit:read',
  ],
  editor: [
    'articles:read',
    'articles:write',
    'articles:delete',
    'categories:manage',
    'media:upload',
    'media:delete',
  ],
  author: [
    'articles:read',
    'articles:write',
    'media:upload',
  ],
  user: [
    'articles:read',
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function assertPermission(role: UserRole, permission: Permission): void {
  if (!hasPermission(role, permission)) {
    throw new Error(`Forbidden: Role '${role}' lacks permission '${permission}'`);
  }
}
