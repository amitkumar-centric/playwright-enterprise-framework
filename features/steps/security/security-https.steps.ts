import { expect } from '@playwright/test';

import { createBdd } from 'playwright-bdd';

import { test } from 'playwright-bdd';

import { config } from '../../../config/framework.config';

import { ErrorHelper } from '../../../utils';

const { Given, Then } = createBdd(test);

let baseUrlProtocol = '';

Given(
  'the application base URL is configured',
  async () => {
    baseUrlProtocol =
      new URL(config.baseUrl).protocol;
  }
);

Then(
  'the application protocol is HTTPS',
  async () => {
    try {
      expect(
        baseUrlProtocol
      ).toBe('https:');
    } catch (error) {
      throw ErrorHelper.create(
        'HTTPS validation failed because the application base URL is not using secure transport',
        `Configured protocol: ${baseUrlProtocol}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);
