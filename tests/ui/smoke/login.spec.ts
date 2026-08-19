import { test, expect } from '../../../fixtures/base.fixture';

import { config } from '../../../config/framework.config';

import { UserFactory } from '../../../data/factories/UserFactory';

import { Tags } from '../../../config/tag.config';

test(
  'User can login with a newly created account',
  {
    tag: [Tags.smoke, Tags.critical, Tags.ui, Tags.nonProd]
  },
  async ({ page, loginPage, dashboardPage, adminCredentials, userService }) => {
    const isOrangeHrm = new URL(config.baseUrl).hostname.includes(
      'orangehrmlive.com'
    );

    if (isOrangeHrm) {
      await loginPage.gotoOrangeHrm();

      await loginPage.loginToOrangeHrm(
        adminCredentials.username,
        adminCredentials.password
      );

      await expect(page).toHaveURL(
        /orangehrmlive\.com\/web\/index\.php\/dashboard/
      );

      return;
    }

    const user = UserFactory.create();

    await userService.createAccount(user.email, user.password, user.name);

    try {
      await loginPage.goto();

      await loginPage.login(user.email, user.password);

      await expect(dashboardPage.dashboardHeading).toBeVisible();
    } finally {
      await userService.deleteAccount(user.email, user.password);
    }
  }
);
