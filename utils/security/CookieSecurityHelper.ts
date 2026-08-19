import { BrowserContext, Cookie } from '@playwright/test';

export interface CookieSecurityIssue {
  cookieName: string;

  issues: string[];
}

export class CookieSecurityHelper {
  static async getCookies(context: BrowserContext): Promise<Cookie[]> {
    return context.cookies();
  }

  static async getCookieByName(
    context: BrowserContext,
    cookieName: string
  ): Promise<Cookie | undefined> {
    const cookies = await context.cookies();

    return cookies.find((cookie) => cookie.name === cookieName);
  }

  static async getInsecureCookies(context: BrowserContext): Promise<Cookie[]> {
    const cookies = await context.cookies();

    return cookies.filter((cookie) => !cookie.secure);
  }

  static async getNonHttpOnlyCookies(
    context: BrowserContext
  ): Promise<Cookie[]> {
    const cookies = await context.cookies();

    return cookies.filter((cookie) => !cookie.httpOnly);
  }

  static async validateCookie(
    context: BrowserContext,
    cookieName: string
  ): Promise<CookieSecurityIssue | null> {
    const cookie = await this.getCookieByName(context, cookieName);

    if (!cookie) {
      return {
        cookieName,
        issues: ['Cookie was not found.']
      };
    }

    const issues: string[] = [];

    if (!cookie.secure) {
      issues.push('Secure flag is missing.');
    }

    if (!cookie.httpOnly) {
      issues.push('HttpOnly flag is missing.');
    }

    if (cookie.sameSite === 'None' && !cookie.secure) {
      issues.push('SameSite=None cookie must use Secure flag.');
    }

    if (issues.length === 0) {
      return null;
    }

    return {
      cookieName,
      issues
    };
  }

  static async validateCookies(
    context: BrowserContext,
    cookieNames: string[]
  ): Promise<CookieSecurityIssue[]> {
    const results: CookieSecurityIssue[] = [];

    for (const cookieName of cookieNames) {
      const result = await this.validateCookie(context, cookieName);

      if (result) {
        results.push(result);
      }
    }

    return results;
  }
}
