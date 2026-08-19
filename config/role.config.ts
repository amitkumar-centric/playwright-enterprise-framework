import { UserRole } from '../fixtures/role.types';

export interface RoleConfig {
  role: UserRole;

  usernameSecret: string;

  passwordSecret: string;

  storageStatePath: string;
}

export const roles: Record<UserRole, RoleConfig> = {
  admin: {
    role: 'admin',

    usernameSecret: 'ADMIN_USERNAME',

    passwordSecret: 'ADMIN_PASSWORD',

    storageStatePath: 'auth/states/admin.json'
  },

  user: {
    role: 'user',

    usernameSecret: 'USER_USERNAME',

    passwordSecret: 'USER_PASSWORD',

    storageStatePath: 'auth/states/user.json'
  },

  manager: {
    role: 'manager',

    usernameSecret: 'MANAGER_USERNAME',

    passwordSecret: 'MANAGER_PASSWORD',

    storageStatePath: 'auth/states/manager.json'
  },

  readonly: {
    role: 'readonly',

    usernameSecret: 'READONLY_USERNAME',

    passwordSecret: 'READONLY_PASSWORD',

    storageStatePath: 'auth/states/readonly.json'
  }
};
