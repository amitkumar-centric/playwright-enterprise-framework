import { defineConfig, devices } from '@playwright/test';

import { defineBddConfig } from 'playwright-bdd';

import { config } from './config/framework.config';

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: ['features/steps/**/*.ts']
});

console.log(`Running BDD tests against: ${config.environment.toUpperCase()}`);

export default defineConfig({
  testDir,
  outputDir: 'test-results/bdd',

  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'playwright-report/bdd',
        open: 'never'
      }
    ]
  ],

  use: {
    baseURL: config.baseUrl,
    headless: config.browser.headless,
    trace: 'on-first-retry',
    actionTimeout: config.browser.actionTimeout,
    navigationTimeout: config.browser.navigationTimeout
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
