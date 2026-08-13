import { SecretManager } from './SecretManager';
import { createSecretProvider } from './SecretProviderFactory';

export const secrets = new SecretManager(
  createSecretProvider()
);