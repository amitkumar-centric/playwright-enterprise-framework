import {
  Page,
  Locator
} from '@playwright/test';

export class HeaderComponent {

  readonly userDropdown: Locator;
  readonly logoutLink: Locator;

  constructor(
    private readonly page: Page
  ) {

    this.userDropdown =
      page.locator(
        '.oxd-userdropdown-name'
      );

    this.logoutLink =
      page.getByRole(
        'menuitem',
        {
          name: 'Logout'
        }
      );
  }

  async openUserMenu():
    Promise<void> {

    await this.userDropdown.click();
  }

  async logout():
    Promise<void> {

    await this.openUserMenu();

    await this.logoutLink.click();
  }
}