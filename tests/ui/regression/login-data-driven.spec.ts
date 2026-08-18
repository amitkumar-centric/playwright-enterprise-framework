import {
  test,
  expect
} from '../../../fixtures/base.fixture';

import {
  JsonDataLoader
} from '../../../data/loaders/JsonDataLoader';

import {
  LoginTestData
} from '../../../data/models/LoginTestData';

import {
  Tags
} from '../../../config/tag.config';


const loginData =
  JsonDataLoader.load<LoginTestData[]>(
    'data/static/login-users.json'
  );


for (const data of loginData) {

  test(
    `login validation - ${data.name}`,
    {
      tag: [
        Tags.regression,
        Tags.ui,
        Tags.nonProd
      ]
    },
    async ({
      loginPage,
      dashboardPage
    }) => {

      await loginPage.goto();

      await loginPage.login(
        data.username,
        data.password
      );


      if (
        data.expectedResult ===
        'success'
      ) {

        await expect(
          dashboardPage
            .dashboardHeading
        ).toBeVisible();

      } else {

        await expect(
          loginPage
            .invalidCredentialsMessage
        ).toBeVisible();

      }

    }
  );
}