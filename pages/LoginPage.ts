import { Page, Locator } from '@playwright/test';

import { config } from '../config/framework.config';

export class LoginPage {
  private static buildOrangeHrmUrl(path: string): string {
    return new URL(path, config.baseUrl).toString();
  }

  readonly page: Page;

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentialsMessage: Locator;
  readonly loginHeading: Locator;
  readonly orangeHrmUsernameInput: Locator;
  readonly orangeHrmPasswordInput: Locator;
  readonly orangeHrmLoginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.locator('input[data-qa="login-email"]');

    this.passwordInput = page.locator('input[data-qa="login-password"]');

    this.loginButton = page.locator('button[data-qa="login-button"]');

    this.invalidCredentialsMessage = page.getByText(
      'Your email or password is incorrect!'
    );

    this.loginHeading = page.getByText('Login to your account');

    this.orangeHrmUsernameInput = page.getByPlaceholder('Username');

    this.orangeHrmPasswordInput = page.getByPlaceholder('Password');

    this.orangeHrmLoginButton = page.getByRole('button', {
      name: 'Login'
    });
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');

    await this.loginHeading.waitFor();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);

    await this.passwordInput.fill(password);

    await this.loginButton.click();
  }

  async gotoOrangeHrm(): Promise<void> {
    await this.page.context().clearCookies();

    await this.page.goto(
      LoginPage.buildOrangeHrmUrl('/web/index.php/auth/login')
    );

    await this.orangeHrmUsernameInput.waitFor();
  }

  async loginToOrangeHrm(username: string, password: string): Promise<void> {
    await this.orangeHrmUsernameInput.fill(username);

    await this.orangeHrmPasswordInput.fill(password);

    await this.orangeHrmLoginButton.click();
  }
}
