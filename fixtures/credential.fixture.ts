import {
  secrets
} from '../services/secrets';

export interface Credentials {
  username: string;
  password: string;
}

export async function getAdminCredentials():
  Promise<Credentials> {

  const username =
    await secrets.get(
      'ADMIN_USERNAME'
    );

  const password =
    await secrets.get(
      'ADMIN_PASSWORD'
    );

  return {
    username,
    password
  };
}