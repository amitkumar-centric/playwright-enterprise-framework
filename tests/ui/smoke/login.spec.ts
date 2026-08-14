import {
  test,
  expect
} from '@playwright/test';

import {
  secrets
} from '../../../services/secrets';

test.beforeEach(async () => {
  const hasUsername =
    await secrets.has('ADMIN_USERNAME');

  const hasPassword =
    await secrets.has('ADMIN_PASSWORD');

  test.skip(
    !hasUsername || !hasPassword,
    'ADMIN_USERNAME and ADMIN_PASSWORD must be configured.'
  );
});

test(
  'OrangeHRM admin can login',
  async ({ page }) => {

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
