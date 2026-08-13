import { test, expect } from '@playwright/test';

import { secrets } from '../../../services/secrets';

test('verify secret provider configuration', async () => {

  const username =
    await secrets.get('ADMIN_USERNAME');

  const password =
    await secrets.get('ADMIN_PASSWORD');

  expect(username).toBeTruthy();

  expect(password).toBeTruthy();
});