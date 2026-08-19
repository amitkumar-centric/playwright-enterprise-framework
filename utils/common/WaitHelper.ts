import { Page, Response } from '@playwright/test';

export class WaitHelper {
  static async forSuccessfulResponse(
    page: Page,
    urlPart: string
  ): Promise<Response> {
    return page.waitForResponse(
      (response) => response.url().includes(urlPart) && response.ok()
    );
  }

  static async forResponseStatus(
    page: Page,
    urlPart: string,
    expectedStatus: number
  ): Promise<Response> {
    return page.waitForResponse(
      (response) =>
        response.url().includes(urlPart) && response.status() === expectedStatus
    );
  }

  static async forUrl(page: Page, url: string | RegExp): Promise<void> {
    await page.waitForURL(url);
  }
}
