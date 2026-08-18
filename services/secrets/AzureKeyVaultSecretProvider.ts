import {
  SecretClient
} from '@azure/keyvault-secrets';

import {
  DefaultAzureCredential
} from '@azure/identity';

import {
  SecretProvider
} from './SecretProvider';


export class AzureKeyVaultSecretProvider
  implements SecretProvider {

  private readonly client:
    SecretClient;


  constructor() {

    const vaultUrl =
      process.env.AZURE_KEY_VAULT_URL;

    if (!vaultUrl) {
      throw new Error(
        'AZURE_KEY_VAULT_URL is not configured.'
      );
    }

    const credential =
      new DefaultAzureCredential();

    this.client =
      new SecretClient(
        vaultUrl,
        credential
      );
  }


  async get(
    key: string
  ): Promise<string> {

    const vaultKey =
      key.replaceAll('_', '-');

    const result =
      await this.client.getSecret(
        vaultKey
      );

    if (!result.value) {
      throw new Error(
        `Secret "${key}" is missing from Azure Key Vault.`
      );
    }

    return result.value;
  }


  async has(
    key: string
  ): Promise<boolean> {

    try {

      await this.get(key);

      return true;

    } catch {

      return false;

    }
  }
}