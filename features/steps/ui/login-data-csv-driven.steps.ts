import { expect } from '@playwright/test';

import { createBdd } from 'playwright-bdd';

import { test } from 'playwright-bdd';

import { EmployeeData } from '../../../data/models/EmployeeData';

import { getAdminCredentials } from '../../../fixtures/credential.fixture';

import { config } from '../../../config/framework.config';

import { LoginPage } from '../../../pages/LoginPage';

import { PimPage } from '../../../pages/PimPage';

import { ErrorHelper } from '../../../utils';

const { Before, Given, When, Then } = createBdd(test);

const isOrangeHrm = new URL(config.baseUrl).hostname.includes(
  'orangehrmlive.com'
);

Before(async ({ browserName }) => {
  test.skip(
    browserName === 'firefox',
    'Skipped on Firefox because browser context setup is timing out in this environment.'
  );
});

Given(
  'the admin is logged into the employee management application for CSV employee creation',
  async ({ page }) => {
    const loginPage = new LoginPage(page);
    const credentials = await getAdminCredentials();

    try {
      if (isOrangeHrm) {
        await loginPage.gotoOrangeHrm();

        await loginPage.loginToOrangeHrm(
          credentials.username,
          credentials.password
        );

        await expect(
          page.getByRole('link', {
            name: 'Dashboard'
          })
        ).toBeVisible();

        return;
      }

      await loginPage.goto();

      await loginPage.login(
        credentials.username,
        credentials.password
      );
    } catch (error) {
      throw ErrorHelper.create(
        'Admin could not sign in before CSV employee creation started',
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

When(
  'the admin creates employee record from CSV data {string} {string} {string}',
  async (
    { page },
    firstName: EmployeeData['firstName'],
    middleName: EmployeeData['middleName'],
    lastName: EmployeeData['lastName']
  ) => {
    const pimPage = new PimPage(page);

    try {
      await pimPage.goto();
      await pimPage.openAddEmployee();
      await pimPage.createEmployee(
        firstName,
        lastName,
        middleName
      );
    } catch (error) {
      throw ErrorHelper.create(
        `CSV employee creation failed for "${firstName} ${lastName}"`,
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

Then(
  'the employee personal details page is displayed for CSV employee creation',
  async ({ page }) => {
    const pimPage = new PimPage(page);

    try {
      await expect(
        pimPage.personalDetailsHeading
      ).toBeVisible();
    } catch (error) {
      throw ErrorHelper.create(
        'CSV employee creation did not complete because the Personal Details page was not shown',
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);
