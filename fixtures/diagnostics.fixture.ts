import {
  Page,
  TestInfo
} from '@playwright/test';

import {
  captureBrowserConsole,
  captureNetwork
} from '../utils';


export interface Diagnostics {
  browserLogs: string[];
  networkLogs: string[];
}


export async function setupDiagnostics(
  page: Page,
  testInfo: TestInfo
): Promise<Diagnostics> {

  const browserLogs: string[] = [];
  const networkLogs: string[] = [];

  captureBrowserConsole(
    page,
    browserLogs
  );

  captureNetwork(
    page,
    networkLogs
  );

  return {
    browserLogs,
    networkLogs
  };
}


export async function attachDiagnostics(
  page: Page,
  diagnostics: Diagnostics,
  testInfo: TestInfo
): Promise<void> {

  if (
    testInfo.status ===
    testInfo.expectedStatus
  ) {
    return;
  }


  // ==============================
  // Full-page screenshot
  // ==============================

  try {

    const screenshot =
      await page.screenshot({
        fullPage: true
      });


    await testInfo.attach(
      'failure-full-page.png',
      {
        body:
          screenshot,

        contentType:
          'image/png'
      }
    );

  } catch (error) {

    console.error(
      'Unable to capture failure screenshot.'
    );

  }


  // ==============================
  // Browser console logs
  // ==============================

  if (
    diagnostics.browserLogs.length > 0
  ) {

    await testInfo.attach(
      'browser-console.log',
      {
        body:
          Buffer.from(
            diagnostics.browserLogs.join(
              '\n'
            )
          ),

        contentType:
          'text/plain'
      }
    );

  }


  // ==============================
  // Network logs
  // ==============================

  if (
    diagnostics.networkLogs.length > 0
  ) {

    await testInfo.attach(
      'network.log',
      {
        body:
          Buffer.from(
            diagnostics.networkLogs.join(
              '\n'
            )
          ),

        contentType:
          'text/plain'
      }
    );

  }

}