import {
  SecretProvider
} from './SecretProvider';

import {
  EnvSecretProvider
} from './EnvSecretProvider';


export function createSecretProvider():
  SecretProvider {

  const provider =
    process.env.SECRET_PROVIDER || 'env';

  switch (provider) {

    case 'env':

      return new EnvSecretProvider();

    default:

      throw new Error(
        `Unsupported secret provider: ${provider}`
      );

  }

}