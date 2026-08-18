import {
  Page
} from '@playwright/test';


export function captureBrowserConsole(
  page: Page,
  logs: string[]
): void {

  page.on(
    'console',
    message => {

      logs.push(
        `[BROWSER ${message.type().toUpperCase()}] ${message.text()}`
      );

    }
  );


  page.on(
    'pageerror',
    error => {

      logs.push(
        `[PAGE ERROR] ${error.message}`
      );

    }
  );
}