import { Page } from '@playwright/test';

export interface PagePerformance {
  duration: number;

  domContentLoaded: number;

  loadComplete: number;
}

export class PerformanceHelper {
  static async getPagePerformance(page: Page): Promise<PagePerformance> {
    return page.evaluate(() => {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;

      if (!navigation) {
        throw new Error('Navigation performance information is unavailable.');
      }

      return {
        duration: navigation.duration,

        domContentLoaded: navigation.domContentLoadedEventEnd,

        loadComplete: navigation.loadEventEnd
      };
    });
  }
}
