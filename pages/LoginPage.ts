import {
  Page,
  Locator
} from '@playwright/test';


export class LoginPage {

  readonly page: Page;

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly invalidCredentialsMessage: Locator;
  readonly loginHeading: Locator;


  constructor(page: Page) {

    this.page = page;

    this.usernameInput =
      page.locator(
        'input[data-qa="login-email"]'
      );

    this.passwordInput =
      page.locator(
        'input[data-qa="login-password"]'
      );

    this.loginButton =
      page.locator(
        'button[data-qa="login-button"]'
      );

    this.invalidCredentialsMessage =
      page.getByText(
        'Your email or password is incorrect!'
      );

    this.loginHeading =
      page.getByText(
        'Login to your account'
      );
  }


  async goto(): Promise<void> {

    await this.page.goto(
      '/login'
    );

    await this.loginHeading
      .waitFor();
  }


  async login(
    username: string,
    password: string
  ): Promise<void> {

    await this.usernameInput.fill(
      username
    );

    await this.passwordInput.fill(
      password
    );

    await this.loginButton.click();
  }

}
