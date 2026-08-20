import { test, expect } from '../../fixtures/base.fixture';

import { Tags } from '../../config/tag.config';

import { flakyConfig } from '../../config/flaky.config';

test.skip(
  ({ browserName }) => browserName === 'firefox',
  'Skipped on Firefox because browser context setup is timing out in this environment.'
);

test.describe(
  'Known flaky product scenarios',
  {
    tag: [Tags.regression, Tags.ui, Tags.flaky, Tags.quarantine]
  },
  () => {
    test.describe.configure({
      retries: flakyConfig.quarantineRetries
    });

    test('product search displays Blue Top', async ({
      productsPage,
      logger,
      diagnostics: _diagnostics,
      flakyTracking: _flakyTracking
    }, testInfo) => {
      logger.info(`Starting product search. Retry=${testInfo.retry}`);

      await productsPage.goto();

      await productsPage.searchProduct('Blue Top');

      await expect(productsPage.productName('Blue Top')).toBeVisible();

      logger.info('Product search completed');
    });
  }
);
