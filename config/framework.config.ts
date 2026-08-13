import {
  resolveEnvironment
} from './environment.config';

import {
  frameworkDefaults
} from './framework.defaults';

import {
  FrameworkConfig
} from './framework.types';


function buildFrameworkConfig(): FrameworkConfig {

  const environment =
    resolveEnvironment();

  return {

    environment:
      environment.name,

    baseUrl:
      environment.baseUrl,

    apiUrl:
      environment.apiUrl,

    timeout:
      environment.timeout,

    browser: {
      headless:
        frameworkDefaults.browser.headless,

      actionTimeout:
        frameworkDefaults.browser.actionTimeout,

      navigationTimeout:
        frameworkDefaults.browser.navigationTimeout
    },

    logging: {
      level:
        frameworkDefaults.logging.level
    },

    performance: {
      pageLoadThreshold:
        frameworkDefaults.performance.pageLoadThreshold,

      apiResponseThreshold:
        frameworkDefaults.performance.apiResponseThreshold
    }

  };
}


export const config =
  buildFrameworkConfig();