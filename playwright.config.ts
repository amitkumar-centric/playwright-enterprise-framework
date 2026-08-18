import {
  defineConfig,
  devices
} from '@playwright/test';

import {
  config
} from './config/framework.config';

import {
  executionConfig
} from './config/execution.config';

import {
  reportingConfig
} from './config/reporting.config';


const isCI =
  Boolean(process.env.CI);


const execution =
  isCI
    ? executionConfig.ci
    : executionConfig.local;


export default defineConfig({

  testDir:
    './tests',

  fullyParallel:
    true,

  workers:
    execution.workers,

  retries:
    execution.retries,

  maxFailures:
    execution.maxFailures,


  reporter: [

    [
      isCI
        ? 'dot'
        : 'list'
    ],

    [
      'html',
      {

        outputFolder:
          reportingConfig
            .playwrightHtml
            .outputFolder,

        open:
          'never'

      }
    ],

    [
      'allure-playwright',
      {

        resultsDir:
          reportingConfig
            .allure
            .resultsDir

      }
    ],

    [
      'junit',
      {

        outputFile:
          reportingConfig
            .junit
            .outputFile

      }
    ]

  ],


  use: {

    baseURL:
      config.baseUrl,

    screenshot:
      'only-on-failure',

    video:
      'retain-on-failure',

    trace:
      'on-first-retry'

  },


  projects: [

    {
      name: 'chromium',

      use: {
        ...devices[
          'Desktop Chrome'
        ]
      }
    },

    {
      name: 'firefox',

      use: {
        ...devices[
          'Desktop Firefox'
        ]
      }
    },

    {
      name: 'webkit',

      use: {
        ...devices[
          'Desktop Safari'
        ]
      }
    }

  ]

});