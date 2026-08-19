import { test as setup, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';

import { DashboardPage } from '../../pages/DashboardPage';

import { getRoleCredentials } from '../../fixtures/role.fixture';

import { roles } from '../../config/role.config';

setup('authenticate admin', async ({ page }) => {
  const credentials = await getRoleCredentials('admin');

  const loginPage = new LoginPage(page);

  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();

  await loginPage.login(credentials.username, credentials.password);

  await expect(dashboardPage.dashboardHeading).toBeVisible();

  await page.context().storageState({
    path: roles.admin.storageStatePath
  });
});
