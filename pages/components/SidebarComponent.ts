import {
  Page,
  Locator
} from '@playwright/test';

export class SidebarComponent {

  readonly dashboardLink: Locator;
  readonly adminLink: Locator;
  readonly pimLink: Locator;
  readonly leaveLink: Locator;

  constructor(
    private readonly page: Page
  ) {

    this.dashboardLink =
      page.getByRole(
        'link',
        {
          name: 'Dashboard'
        }
      );

    this.adminLink =
      page.getByRole(
        'link',
        {
          name: 'Admin'
        }
      );

    this.pimLink =
      page.getByRole(
        'link',
        {
          name: 'PIM'
        }
      );

    this.leaveLink =
      page.getByRole(
        'link',
        {
          name: 'Leave'
        }
      );
  }

  async openDashboard():
    Promise<void> {

    await this.dashboardLink.click();
  }

  async openAdmin():
    Promise<void> {

    await this.adminLink.click();
  }

  async openPim():
    Promise<void> {

    await this.pimLink.click();
  }

  async openLeave():
    Promise<void> {

    await this.leaveLink.click();
  }
}