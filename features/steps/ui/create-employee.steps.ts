import { expect } from '@playwright/test';

import { createBdd } from 'playwright-bdd';

import { test } from 'playwright-bdd';

import { config } from '../../../config/framework.config';

import { EmployeeFactory } from '../../../data/factories/EmployeeFactory';

import { EmployeeDataVersion } from '../../../data/models/EmployeeData';

import { getAdminCredentials } from '../../../fixtures/credential.fixture';

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
  'the admin is logged into the employee management application',
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

      await loginPage.login(credentials.username, credentials.password);
    } catch (error) {
      throw ErrorHelper.create(
        'Admin could not sign in to the employee management application before employee creation started',
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

When(
  'the admin creates a new employee record using data version {string}',
  async ({ page }, version: EmployeeDataVersion) => {
    const pimPage = new PimPage(page);

    const employee = EmployeeFactory.createVersion(version);

    try {
      await pimPage.goto();

      await pimPage.openAddEmployee();

      await pimPage.createEmployee(
        employee.firstName,
        employee.lastName,
        employee.middleName,
        employee.employeeId
      );
    } catch (error) {
      throw ErrorHelper.create(
        `Admin could not create an employee using data version "${version}"`,
        `Employee: ${employee.firstName} ${employee.lastName}. Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

Then('the personal details page is displayed', async ({ page }) => {
  const pimPage = new PimPage(page);

  try {
    await expect(pimPage.personalDetailsHeading).toBeVisible();
  } catch (error) {
    throw ErrorHelper.create(
      'Employee creation did not complete because the Personal Details page was not shown',
      `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
    );
  }
});
