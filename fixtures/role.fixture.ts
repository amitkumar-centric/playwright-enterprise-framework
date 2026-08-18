import {
  secrets
} from '../services/secrets';

import {
  roles
} from '../config/role.config';

import {
  UserRole
} from './role.types';


export interface RoleCredentials {

  role:
    UserRole;

  username:
    string;

  password:
    string;
}


export async function getRoleCredentials(
  role: UserRole
): Promise<RoleCredentials> {

  const config =
    roles[role];


  const username =
    await secrets.get(
      config.usernameSecret
    );


  const password =
    await secrets.get(
      config.passwordSecret
    );


  return {

    role,

    username,

    password

  };
}