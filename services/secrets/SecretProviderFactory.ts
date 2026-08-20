import {
  SecretProvider
} from './SecretProvider';

import {
  EnvSecretProvider
} from './EnvSecretProvider';

import {
  AzureKeyVaultSecretProvider
} from './AzureKeyVaultSecretProvider';


export class SecretProviderFactory {

  static create():
    SecretProvider {

    const provider =
      process.env.SECRET_PROVIDER
        ?.toLowerCase()
        ?? 'env';


    switch (provider) {

      case 'azure':

        return new AzureKeyVaultSecretProvider();


      case 'env':

        return new EnvSecretProvider();


      default:

        throw new Error(
          `Unsupported secret provider: ${provider}`
        );
    }
  }
}

export function createSecretProvider():
  SecretProvider {

  return SecretProviderFactory.create();
}
