import { expect } from '@playwright/test';

import { createBdd } from 'playwright-bdd';

import { test } from 'playwright-bdd';

import { LocatorHelper } from '../../../utils';

import { ErrorHelper } from '../../../utils';

const { Given, When, Then } = createBdd(test);

Given(
  'the user opens the OrangeHRM login page for self-healing validation',
  async ({ page }) => {
    try {
      await page.goto(
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
      );

      await page.getByPlaceholder('Username').fill('Admin');

      await page.getByPlaceholder('Password').fill('admin123');
    } catch (error) {
      throw ErrorHelper.create(
        'The self-healing validation could not prepare the OrangeHRM login page',
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

When(
  'the user signs in through the self-healing login button flow',
  async ({ page }) => {
    try {
      const loginButton = await LocatorHelper.resolve([
        {
          name: 'PRIMARY: data-testid=login-button-broken',
          locator: () => page.getByTestId('login-button-broken')
        },
        {
          name: 'FALLBACK: role=button name=Login',
          locator: () =>
            page.getByRole('button', {
              name: 'Login'
            })
        }
      ]);

      await loginButton.click();
    } catch (error) {
      throw ErrorHelper.create(
        'The self-healing locator flow could not recover the Login button interaction',
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

Then(
  'the OrangeHRM dashboard is displayed after self-healing',
  async ({ page }) => {
    try {
      await expect(page).toHaveURL(/dashboard/);

      await expect(
        page.getByRole('heading', {
          name: 'Dashboard'
        })
      ).toBeVisible();
    } catch (error) {
      throw ErrorHelper.create(
        'The self-healing login flow did not reach the OrangeHRM dashboard',
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);
