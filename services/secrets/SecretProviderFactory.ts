import {
  SecretProvider
} from './SecretProvider';

import {
  EnvSecretProvider
} from './EnvSecretProvider';

import {
  AzureKeyVaultSecretProvider
} from './AzureKeyVaultSecretProvider';


export function createSecretProvider():
  SecretProvider {

  const provider =
    process.env.SECRET_PROVIDER || 'env';


  switch (provider) {

    case 'env':

      return new EnvSecretProvider();


    case 'azure-key-vault':

      return new AzureKeyVaultSecretProvider();


    default:

      throw new Error(
        `Unsupported secret provider: ${provider}`
      );

  }

}