import {
  test,
  expect
} from '../../fixtures/base.fixture';

import {
  SecurityHeadersHelper
} from '../../utils';

import {
  Tags
} from '../../config/tag.config';


test(
  'application exposes expected security headers',
  {
    tag: [
      Tags.security,
      Tags.prodSafe
    ]
  },
  async ({
    apiClient
  }) => {

    const response =
      await apiClient.get<unknown>(
        '/'
      );


    const missing =
      SecurityHeadersHelper
        .getMissingHeaders(
          response.headers
        );


    expect(
      missing,
      `Missing security headers: ${missing.join(', ')}`
    ).toEqual([]);

  }
);
