import { test, expect } from '../../fixtures/base.fixture';

import { Tags } from '../../config/tag.config';

test(
  'Automation Exercise products page works on BrowserStack',
  {
    tag: [Tags.smoke, Tags.ui, Tags.cloud, Tags.crossBrowser, Tags.prodSafe]
  },
  async ({ productsPage, logger, diagnostics: _diagnostics }) => {
    logger.info('Starting BrowserStack cloud smoke test');

    await productsPage.goto();

    await expect(productsPage.allProductsHeading).toBeVisible();

    logger.info('Products page successfully validated');
  }
);
