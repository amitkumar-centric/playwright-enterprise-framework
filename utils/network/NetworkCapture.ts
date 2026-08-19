import { Page } from '@playwright/test';

export function captureNetwork(page: Page, logs: string[]): void {
  page.on('request', (request) => {
    logs.push(`[REQUEST] ${request.method()} ${request.url()}`);
  });

  page.on('response', (response) => {
    logs.push(`[RESPONSE] ${response.status()} ${response.url()}`);
  });

  page.on('requestfailed', (request) => {
    logs.push(`[REQUEST FAILED] ${request.method()} ${request.url()}`);
  });
}
