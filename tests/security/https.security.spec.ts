import {
  test,
  expect
} from '../../fixtures/base.fixture';

import {
  config
} from '../../config/framework.config';

import {
  Tags
} from '../../config/tag.config';


test(
  'application uses HTTPS',
  {
    tag: [
      Tags.security,
      Tags.prodSafe
    ]
  },
  async () => {

    const url =
      new URL(
        config.baseUrl
      );

    expect(
      url.protocol
    ).toBe(
      'https:'
    );

  }
);