import { TestInfo } from '@playwright/test';

import { Logger } from '../logger/Logger';

export class FlakyTestHelper {
  static trackRetry(testInfo: TestInfo, logger?: Logger): void {
    if (testInfo.retry === 0) {
      logger?.info('Initial test execution');

      return;
    }

    logger?.warn(`Flaky test retry detected. Retry attempt=${testInfo.retry}`);
  }

  static isRetry(testInfo: TestInfo): boolean {
    return testInfo.retry > 0;
  }

  static async attachRetryInfo(testInfo: TestInfo): Promise<void> {
    if (testInfo.retry === 0) {
      return;
    }

    await testInfo.attach('flaky-retry-info.txt', {
      body: Buffer.from(
        [
          `Test: ${testInfo.title}`,
          `Retry: ${testInfo.retry}`,
          `Status: ${testInfo.status}`,
          `Expected Status: ${testInfo.expectedStatus}`
        ].join('\n')
      ),

      contentType: 'text/plain'
    });
  }
}
