import 'dotenv/config';

import { SecretProvider } from './SecretProvider';

export class EnvSecretProvider implements SecretProvider {
  async get(key: string): Promise<string> {
    const value = process.env[key];

    if (!value) {
      throw new Error(`Required secret "${key}" is not configured.`);
    }

    return value;
  }

  async has(key: string): Promise<boolean> {
    return Boolean(process.env[key]);
  }
}
