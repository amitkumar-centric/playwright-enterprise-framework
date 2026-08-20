import { test, expect } from '../../fixtures/base.fixture';

import { Tags } from '../../config/tag.config';

import { ErrorHelper } from '../../utils';

test(
  'Automation Exercise products page works on BrowserStack',
  {
    tag: [Tags.smoke, Tags.ui, Tags.cloud, Tags.crossBrowser, Tags.prodSafe]
  },
  async ({ productsPage, logger, diagnostics: _diagnostics }) => {
    logger.info('Starting BrowserStack cloud smoke test');

    try {
      await productsPage.goto();

      await expect(productsPage.allProductsHeading).toBeVisible();
    } catch (error) {
      throw ErrorHelper.create(
        'BrowserStack smoke validation failed because the products page did not load correctly',
        ErrorHelper.getMessage(error)
      );
    }

    logger.info('Products page successfully validated');
  }
);
