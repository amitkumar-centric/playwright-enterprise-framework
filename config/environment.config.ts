import dev from './environments/dev.json';
import qa from './environments/qa.json';
import staging from './environments/staging.json';
import prod from './environments/prod.json';

import { EnvironmentConfig, EnvironmentName } from './environment.types';

const environments: Record<EnvironmentName, EnvironmentConfig> = {
  dev: dev as EnvironmentConfig,
  qa: qa as EnvironmentConfig,
  staging: staging as EnvironmentConfig,
  prod: prod as EnvironmentConfig
};

export function resolveEnvironment(): EnvironmentConfig {
  const envName = (process.env.TEST_ENV || 'qa') as EnvironmentName;

  const environment = environments[envName];

  if (!environment) {
    throw new Error(
      `Unsupported environment: ${envName}. ` +
        `Supported values: dev, qa, staging, prod`
    );
  }

  return environment;
}
