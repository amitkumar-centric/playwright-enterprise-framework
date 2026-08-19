import { TestInfo } from '@playwright/test';

import { Logger, FlakyTestHelper } from '../utils';

export async function trackFlakyTest(
  testInfo: TestInfo,
  logger: Logger
): Promise<void> {
  FlakyTestHelper.trackRetry(testInfo, logger);

  await FlakyTestHelper.attachRetryInfo(testInfo);
}
