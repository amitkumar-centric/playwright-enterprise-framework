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

const isOrangeHrmEnvironment =
  new URL(
    config.baseUrl
  ).hostname.includes(
    'orangehrmlive.com'
  );

const execution =
  isCI
    ? executionConfig.ci
    : executionConfig.local;


export default defineConfig({

  timeout:
    config.timeout,

  testDir:
    './tests',

  fullyParallel:
    !isOrangeHrmEnvironment,

  workers:
    execution.workers
    ?? (
      isOrangeHrmEnvironment
        ? 1
        : undefined
    ),

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

    actionTimeout:
      config.browser
        .actionTimeout,

    navigationTimeout:
      config.browser
        .navigationTimeout,

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

      timeout:
        60_000,

      use: {

        ...devices[
          'Desktop Firefox'
        ],

        launchOptions: {

          timeout:
            60_000,

          env: {
            ...process.env,
            MOZ_WEBRENDER: '0',
            MOZ_ACCELERATED: '0'
          },

          firefoxUserPrefs: {
            'gfx.webrender.all': false,
            'gfx.webrender.enabled': false,
            'layers.acceleration.disabled': true,
            'gfx.canvas.accelerated': false
          }

        },

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
