import {
  Page,
  Locator
} from '@playwright/test';


export class DashboardPage {

  readonly page: Page;

  readonly dashboardHeading: Locator;


  constructor(page: Page) {

    this.page = page;

    this.dashboardHeading =
      page.getByRole(
        'heading',
        {
          name: 'Dashboard'
        }
      );
  }


  async isLoaded(): Promise<boolean> {

    return this.dashboardHeading
      .isVisible();
  }

}