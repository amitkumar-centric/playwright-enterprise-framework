import { test, expect } from '../../fixtures/base.fixture';

import { config } from '../../config/framework.config';

import { Tags } from '../../config/tag.config';

test.skip(
  ({ browserName }) => browserName === 'firefox',
  'Skipped on Firefox because page creation is timing out during setup.'
);

test(
  'application exposes baseline security headers',
  {
    tag: [Tags.security, Tags.prodSafe]
  },
  async ({ page }) => {
    const response = await page.goto(config.baseUrl);

    expect(
      response,
      'Expected the home page to return an HTTP response.'
    ).toBeTruthy();

    const headers = response!.headers();

    expect(
      headers['x-content-type-options'],
      'Expected the site to send x-content-type-options.'
    ).toBeTruthy();

    expect(
      headers['x-frame-options'],
      'Expected the site to send x-frame-options.'
    ).toBeTruthy();

    expect(
      headers['referrer-policy'],
      'Expected the site to send referrer-policy.'
    ).toBeTruthy();
  }
);
