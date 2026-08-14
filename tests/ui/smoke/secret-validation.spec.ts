import { test, expect } from '@playwright/test';

import { secrets } from '../../../services/secrets';

const hasAdminCredentials =
  Boolean(process.env.ADMIN_USERNAME) &&
  Boolean(process.env.ADMIN_PASSWORD);

test('verify secret provider configuration', async () => {
  test.skip(
    !hasAdminCredentials,
    'ADMIN_USERNAME and ADMIN_PASSWORD must be configured.'
  );

  const username =
    await secrets.get('ADMIN_USERNAME');

  const password =
    await secrets.get('ADMIN_PASSWORD');

  expect(username).toBeTruthy();

  expect(password).toBeTruthy();
});
