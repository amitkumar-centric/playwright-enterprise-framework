import { SecretProvider } from './SecretProvider';

export class SecretManager {
  constructor(private readonly provider: SecretProvider) {}

  async get(key: string): Promise<string> {
    return this.provider.get(key);
  }

  async has(key: string): Promise<boolean> {
    return this.provider.has(key);
  }
}
