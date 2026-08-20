import { createBdd } from 'playwright-bdd';

import { test } from 'playwright-bdd';

import { performanceConfig } from '../../../config/performance.config';

import { ErrorHelper, PerformanceHelper } from '../../../utils';

const { Given, When, Then } = createBdd(test);

let pageLoadDurationMs = 0;

Given(
  'the user opens the products page for performance validation',
  async ({ page }) => {
    try {
      await page.goto('/products');
    } catch (error) {
      throw ErrorHelper.create(
        'The products page could not be opened for performance validation',
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

When(
  'the page performance metrics are captured',
  async ({ page }) => {
    try {
      const performance =
        await PerformanceHelper.getPagePerformance(page);

      pageLoadDurationMs = performance.duration;
    } catch (error) {
      throw ErrorHelper.create(
        'Page performance metrics could not be captured for the products page',
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

Then(
  'the products page load duration is within the configured threshold',
  async () => {
    if (
      pageLoadDurationMs >
      performanceConfig.pageLoad.maximum
    ) {
      throw ErrorHelper.create(
        'Products page performance validation failed because the page load duration exceeded the configured threshold',
        `Measured: ${pageLoadDurationMs.toFixed(0)} ms. Allowed maximum: ${performanceConfig.pageLoad.maximum} ms.`
      );
    }
  }
);
