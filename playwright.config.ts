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

import {
  roles
} from './config/role.config';


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

    // ---------------------------------
    // Authentication setup
    // ---------------------------------

    {
      name:
        'admin-setup',

      testMatch:
        /.*auth\.setup\.ts/
    },


    // ---------------------------------
    // Chromium
    // ---------------------------------

    {
      name:
        'chromium',

      dependencies: [
        'admin-setup'
      ],

      use: {

        ...devices[
          'Desktop Chrome'
        ],

        storageState:
          roles.admin
            .storageStatePath

      }

    },


    // ---------------------------------
    // Firefox
    // ---------------------------------

    {
      name:
        'firefox',

      dependencies: [
        'admin-setup'
      ],

      use: {

        ...devices[
          'Desktop Firefox'
        ],

        storageState:
          roles.admin
            .storageStatePath

      }

    },


    // ---------------------------------
    // WebKit
    // ---------------------------------

    {
      name:
        'webkit',

      dependencies: [
        'admin-setup'
      ],

      use: {

        ...devices[
          'Desktop Safari'
        ],

        storageState:
          roles.admin
            .storageStatePath

      }

    }

  ]

});