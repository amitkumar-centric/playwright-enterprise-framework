import {
  test,
  expect
} from '@playwright/test';


test(
  'application login page loads',
  async ({ page }) => {

    await page.goto('/login');

    await expect(page)
      .toHaveURL(/login/);
  }
);