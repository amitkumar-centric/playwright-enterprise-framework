import { expect } from '@playwright/test';

import { createBdd } from 'playwright-bdd';

import { test } from 'playwright-bdd';

import { config } from '../../../config/framework.config';

import { getRoleCredentials } from '../../../fixtures/role.fixture';

import { DashboardPage } from '../../../pages/DashboardPage';

import { LoginPage } from '../../../pages/LoginPage';

import { ErrorHelper } from '../../../utils';

const { Given, When, Then } = createBdd(test);

const isOrangeHrm = new URL(config.baseUrl).hostname.includes(
  'orangehrmlive.com'
);

Given('the admin login page is opened', async ({ page }) => {
  const loginPage = new LoginPage(page);

  try {
    if (isOrangeHrm) {
      await loginPage.gotoOrangeHrm();
      return;
    }

    await loginPage.goto();
  } catch (error) {
    throw ErrorHelper.create(
      'The admin login page could not be opened for authentication setup',
      `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
    );
  }
});

When(
  'the admin signs in with valid role credentials',
  async ({ page }) => {
    const credentials = await getRoleCredentials('admin');

    const loginPage = new LoginPage(page);

    try {
      if (isOrangeHrm) {
        await loginPage.loginToOrangeHrm(
          credentials.username,
          credentials.password
        );
        return;
      }

      await loginPage.login(
        credentials.username,
        credentials.password
      );
    } catch (error) {
      throw ErrorHelper.create(
        'The admin credentials could not be used to complete sign-in',
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

Then('the admin dashboard is displayed', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);

  try {
    if (isOrangeHrm) {
      await expect(page).toHaveURL(
        /orangehrmlive\.com\/web\/index\.php\/dashboard/
      );
      return;
    }

    await expect(
      dashboardPage.dashboardHeading
    ).toBeVisible();
  } catch (error) {
    throw ErrorHelper.create(
      'Admin authentication setup did not complete because the dashboard was not visible after sign-in',
      `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
    );
  }
});
