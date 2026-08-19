import { expect } from '@playwright/test';

import { createBdd } from 'playwright-bdd';

import { test } from 'playwright-bdd';

const { Given, Then } = createBdd(test);

Given('the user opens the application entry page', async ({ page }) => {
  await page.goto('/');
});

Then('the login page is displayed', async ({ page }) => {
  await expect(page).toHaveURL(/login/i);

  await expect(page.locator('input[name="username"]')).toBeVisible();
});
