import { test, expect } from '@playwright/test';

import { secrets } from '../../../services/secrets';

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

test('verify secret provider configuration', async () => {

  const username =
    await secrets.get('ADMIN_USERNAME');

  const password =
    await secrets.get('ADMIN_PASSWORD');

  expect(username).toBeTruthy();

  expect(password).toBeTruthy();
});
