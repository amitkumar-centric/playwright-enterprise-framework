import { defineConfig } from '@playwright/test';

import { config } from './config/framework.config';

export default defineConfig({
  testDir: './tests/cloud',

  testMatch: '**/*.spec.ts',

  timeout: 30_000,

  expect: {
    timeout: 10_000
  },

  fullyParallel: true,

  reporter: [
    [
      'html',
      {
        outputFolder: 'playwright-report/cloud',

        open: 'never'
      }
    ]
  ],

  use: {
    baseURL: config.baseUrl,

    screenshot: 'only-on-failure',

    video: 'off',

    trace: 'off'
  }
});
