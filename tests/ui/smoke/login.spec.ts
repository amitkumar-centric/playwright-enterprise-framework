import {
  test,
  expect
} from '@playwright/test';

import {
  secrets
} from '../../../services/secrets';

const hasAdminCredentials =
  Boolean(process.env.ADMIN_USERNAME) &&
  Boolean(process.env.ADMIN_PASSWORD);

test(
  'OrangeHRM admin can login',
  async ({ page }) => {
    test.skip(
      !hasAdminCredentials,
      'ADMIN_USERNAME and ADMIN_PASSWORD must be configured.'
    );

    const username =
      await secrets.get('ADMIN_USERNAME');

    const password =
      await secrets.get('ADMIN_PASSWORD');


    await page.goto(
      '/web/index.php/auth/login'
    );


    await page
      .getByPlaceholder('Username')
      .fill(username);


    await page
      .getByPlaceholder('Password')
      .fill(password);


    await page
      .getByRole('button', {
        name: 'Login'
      })
      .click();


    await expect(
      page
        .getByRole('heading', {
          name: 'Dashboard'
        })
    ).toBeVisible();

  }
);
