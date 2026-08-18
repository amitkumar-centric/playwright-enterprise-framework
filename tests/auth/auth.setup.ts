import { test as setup, expect } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { dirname } from 'path';

import { LoginPage } from '../../pages/LoginPage';
import { getRoleCredentials } from '../../fixtures/role.fixture';
import { roles } from '../../config/role.config';

setup('authenticate admin', async ({ page }) => {
  const credentials =
    await getRoleCredentials('admin');

  const loginPage =
    new LoginPage(page);

  await loginPage.gotoOrangeHrm();

  await loginPage.loginToOrangeHrm(
    credentials.username,
    credentials.password
  );

  await expect(page)
    .toHaveURL(
      /opensource-demo\.orangehrmlive\.com\/web\/index\.php\/dashboard/
    );

  const storageStatePath =
    roles.admin.storageStatePath;

  await mkdir(
    dirname(storageStatePath),
    { recursive: true }
  );

  await page.context().storageState({
    path: storageStatePath
  });
});
