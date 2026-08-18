import {
  test,
  expect
} from '../../../fixtures/base.fixture';

import {
  UserFactory
} from '../../../data/factories/UserFactory';

import {
  Tags
} from '../../../config/tag.config';


test(
  'User can login with a newly created account',
  {
    tag: [
      Tags.smoke,
      Tags.critical,
      Tags.ui,
      Tags.nonProd
    ]
  },
  async ({
    loginPage,
    dashboardPage,
    userService
  }) => {

    const user =
      UserFactory.create();

    await userService
      .createAccount(
        user.email,
        user.password,
        user.name
      );

    try {

      await loginPage.goto();

      await loginPage.login(
        user.email,
        user.password
      );

      await expect(
        dashboardPage.dashboardHeading
      ).toBeVisible();

    } finally {

      await userService
        .deleteAccount(
          user.email,
          user.password
        );

    }
  }
);
