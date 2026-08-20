import { Response, expect } from '@playwright/test';

import { createBdd } from 'playwright-bdd';

import { test } from 'playwright-bdd';

import { config } from '../../../config/framework.config';

import { ErrorHelper } from '../../../utils';

const { Before, Given, Then } = createBdd(test);

let homePageResponse: Response | null = null;

Before(async ({ browserName }) => {
  test.skip(
    browserName === 'firefox',
    'Skipped on Firefox because page creation is timing out during setup.'
  );
});

Given(
  'the application home page is requested for security header validation',
  async ({ page }) => {
    try {
      homePageResponse =
        await page.goto(config.baseUrl);
    } catch (error) {
      throw ErrorHelper.create(
        'Security header validation could not request the application home page',
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

Then(
  'the response includes baseline security headers',
  async () => {
    try {
      expect(
        homePageResponse,
        'Expected the home page to return an HTTP response.'
      ).toBeTruthy();

      const headers =
        homePageResponse!.headers();

      expect(
        headers['x-content-type-options'],
        'Expected the site to send x-content-type-options.'
      ).toBeTruthy();

      expect(
        headers['x-frame-options'],
        'Expected the site to send x-frame-options.'
      ).toBeTruthy();

      expect(
        headers['referrer-policy'],
        'Expected the site to send referrer-policy.'
      ).toBeTruthy();
    } catch (error) {
      throw ErrorHelper.create(
        'Security header validation failed because one or more baseline headers were missing from the application response',
        ErrorHelper.getMessage(error)
      );
    }
  }
);
