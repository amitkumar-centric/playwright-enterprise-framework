import {
  test as base,
  Page
} from '@playwright/test';

import {
  DashboardPage
} from '../pages/DashboardPage';


type AuthFixtures = {

  adminPage:
    Page;

  adminDashboard:
    DashboardPage;

};


export const authTest =
  base.extend<AuthFixtures>({

    adminPage:
      async ({ page }, use) => {

        await use(page);

      },


    adminDashboard:
      async ({ page }, use) => {

        await use(
          new DashboardPage(page)
        );

      }

  });