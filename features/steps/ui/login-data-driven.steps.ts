import { expect } from '@playwright/test';

import { createBdd } from 'playwright-bdd';

import { test } from 'playwright-bdd';

import { JsonDataLoader } from '../../../data/loaders/JsonDataLoader';

import { LoginTestData } from '../../../data/models/LoginTestData';

import { config } from '../../../config/framework.config';

import { DashboardPage } from '../../../pages/DashboardPage';

import { LoginPage } from '../../../pages/LoginPage';

import { ErrorHelper } from '../../../utils';

const { Before, Given, When, Then } = createBdd(test);

const loginData = JsonDataLoader.load<LoginTestData[]>(
  'data/static/login-users.json'
);

const isOrangeHrm = new URL(config.baseUrl).hostname.includes(
  'orangehrmlive.com'
);

let selectedLoginData: LoginTestData | undefined;

Before(async ({ browserName }) => {
  test.skip(
    browserName === 'firefox',
    'Skipped on Firefox because browser context setup is timing out in this environment.'
  );
});

Given(
  'the login page is ready for data-driven validation',
  async ({ page }) => {
    const loginPage = new LoginPage(page);

    try {
      if (isOrangeHrm) {
        await loginPage.gotoOrangeHrm();
        return;
      }

      await loginPage.goto();
    } catch (error) {
      throw ErrorHelper.create(
        'The login page could not be prepared for data-driven validation',
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

When(
  'the user signs in using login data {string}',
  async ({ page }, dataName: string) => {
    const loginPage = new LoginPage(page);

    selectedLoginData = loginData.find(
      (entry) => entry.name === dataName
    );

    if (!selectedLoginData) {
      throw ErrorHelper.create(
        `No login test data was found with name "${dataName}"`
      );
    }

    try {
      if (isOrangeHrm) {
        await loginPage.loginToOrangeHrm(
          selectedLoginData.username,
          selectedLoginData.password
        );
        return;
      }

      await loginPage.login(
        selectedLoginData.username,
        selectedLoginData.password
      );
    } catch (error) {
      throw ErrorHelper.create(
        `Login action could not be completed using data set "${dataName}"`,
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

Then(
  'the login result matches {string}',
  async ({ page }, expectedResult: LoginTestData['expectedResult']) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    try {
      if (expectedResult === 'success') {
        if (isOrangeHrm) {
          await expect(page).toHaveURL(
            /orangehrmlive\.com\/web\/index\.php\/dashboard\/index/
          );
          return;
        }

        await expect(dashboardPage.dashboardHeading).toBeVisible();
        return;
      }

      if (isOrangeHrm) {
        await expect(loginPage.orangeHrmLoginButton).toBeVisible();
        await expect(loginPage.orangeHrmUsernameInput).toBeVisible();
        return;
      }

      await expect(loginPage.invalidCredentialsMessage).toBeVisible();
    } catch (error) {
      throw ErrorHelper.create(
        `Login validation did not produce the expected result "${expectedResult}" for data set "${selectedLoginData?.name ?? 'unknown'}"`,
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);
