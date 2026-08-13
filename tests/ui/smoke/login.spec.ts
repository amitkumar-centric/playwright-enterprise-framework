import {
  test,
  expect
} from '@playwright/test';

import {
  secrets
} from '../../../services/secrets';


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