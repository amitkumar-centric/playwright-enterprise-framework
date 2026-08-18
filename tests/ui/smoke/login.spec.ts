import {
  test,
  expect
} from '../../../fixtures/base.fixture';

import {
  Tags
} from '../../../config/tag.config';


test(
  'OrangeHRM admin can login',
  {
    tag: [
      Tags.smoke,
      Tags.critical,
      Tags.ui,
      Tags.prodSafe
    ]
  },
  async ({
    loginPage,
    dashboardPage,
    adminCredentials
  }) => {

    await loginPage.goto();

    await loginPage.login(
      adminCredentials.username,
      adminCredentials.password
    );

    await expect(
      dashboardPage.dashboardHeading
    ).toBeVisible();
  }
);