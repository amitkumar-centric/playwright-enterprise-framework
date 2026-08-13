import {
  defineConfig,
  devices
} from '@playwright/test';

import {
  config
} from './config/framework.config';


console.log(
  `Running tests against: ${config.environment.toUpperCase()}`
);


export default defineConfig({

  testDir: './tests',
  outputDir: 'test-results/framework',

  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'playwright-report/framework',
      open: 'never'
    }]
  ],

  use: {

    baseURL:
      config.baseUrl,

    headless:
      config.browser.headless,

    trace:
      'on-first-retry',

    actionTimeout:
      config.browser.actionTimeout,

    navigationTimeout:
      config.browser.navigationTimeout

  },

  projects: [

    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome']
      }
    },

    {
      name: 'firefox',

      use: {
        ...devices['Desktop Firefox']
      }
    },

    {
      name: 'webkit',

      use: {
        ...devices['Desktop Safari']
      }
    }

  ]

});
