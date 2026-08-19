import { test, expect } from '../../../fixtures/base.fixture';

import { JsonDataLoader } from '../../../data/loaders/JsonDataLoader';

import { LoginTestData } from '../../../data/models/LoginTestData';

import { config } from '../../../config/framework.config';

import { Tags } from '../../../config/tag.config';

const loginData = JsonDataLoader.load<LoginTestData[]>(
  'data/static/login-users.json'
);

const isOrangeHrm = new URL(config.baseUrl).hostname.includes(
  'orangehrmlive.com'
);

test.skip(
  ({ browserName }) => browserName === 'firefox',
  'Skipped on Firefox because browser context setup is timing out in this environment.'
);

for (const data of loginData) {
  test(
    `login validation - ${data.name}`,
    {
      tag: [Tags.regression, Tags.ui, Tags.nonProd]
    },
    async ({ page, loginPage, dashboardPage }) => {
      if (isOrangeHrm) {
        await loginPage.gotoOrangeHrm();

        await loginPage.loginToOrangeHrm(data.username, data.password);
      } else {
        await loginPage.goto();

        await loginPage.login(data.username, data.password);
      }

      if (data.expectedResult === 'success') {
        if (isOrangeHrm) {
          await expect(page).toHaveURL(
            /orangehrmlive\.com\/web\/index\.php\/dashboard\/index/
          );

          return;
        }

        await expect(dashboardPage.dashboardHeading).toBeVisible();
      } else {
        if (isOrangeHrm) {
          await expect(loginPage.orangeHrmLoginButton).toBeVisible();

          await expect(loginPage.orangeHrmUsernameInput).toBeVisible();

          return;
        }

        await expect(loginPage.invalidCredentialsMessage).toBeVisible();
      }
    }
  );
}
