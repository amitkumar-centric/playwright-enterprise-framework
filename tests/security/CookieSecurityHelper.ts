import { BrowserContext } from '@playwright/test';

export class CookieSecurityHelper {
  static async getCookies(context: BrowserContext) {
    return context.cookies();
  }

  static async insecureCookies(context: BrowserContext) {
    const cookies = await context.cookies();

    return cookies.filter((cookie) => !cookie.secure);
  }
}
