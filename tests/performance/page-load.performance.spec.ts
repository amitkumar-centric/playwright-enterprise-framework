import { test, expect } from '../../fixtures/base.fixture';

import { PerformanceHelper } from '../../utils';

import { performanceConfig } from '../../config/performance.config';

import { Tags } from '../../config/tag.config';

test(
  'products page loads within performance threshold',
  {
    tag: [Tags.performance, Tags.ui, Tags.prodSafe]
  },
  async ({ page, logger, diagnostics: _diagnostics }) => {
    logger.info('Opening products page');

    await page.goto('/products');

    const performance = await PerformanceHelper.getPagePerformance(page);

    logger.info(`Page load duration: ${performance.duration.toFixed(0)} ms`);

    expect(
      performance.duration,
      `Page load exceeded ${performanceConfig.pageLoad.maximum} ms`
    ).toBeLessThanOrEqual(performanceConfig.pageLoad.maximum);
  }
);
