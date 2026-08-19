import { test, expect } from '../../fixtures/base.fixture';

import { LocatorHelper } from '../../utils';

import { Tags } from '../../config/tag.config';

test(
  'POC - self healing recovers from broken login button locator',
  {
    tag: [Tags.smoke, Tags.ui]
  },
  async ({ page, logger }) => {
    logger.info('Starting self-healing locator POC');

    await page.goto(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    );

    await page.getByPlaceholder('Username').fill('Admin');

    await page.getByPlaceholder('Password').fill('admin123');

    logger.info('Attempting to resolve Login button');

    const loginButton = await LocatorHelper.resolve(
      [
        // Intentionally broken primary locator
        {
          name: 'PRIMARY: data-testid=login-button-broken',

          locator: () => page.getByTestId('login-button-broken')
        },

        // Valid fallback locator
        {
          name: 'FALLBACK: role=button name=Login',

          locator: () =>
            page.getByRole('button', {
              name: 'Login'
            })
        }
      ],

      logger
    );

    await loginButton.click();

    await expect(page).toHaveURL(/dashboard/);

    await expect(
      page.getByRole('heading', {
        name: 'Dashboard'
      })
    ).toBeVisible();

    logger.info('Self-healing locator POC completed successfully');
  }
);
