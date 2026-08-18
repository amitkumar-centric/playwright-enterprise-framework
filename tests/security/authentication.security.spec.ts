import {
  test,
  expect
} from '../../fixtures/base.fixture';

import {
  UserFactory
} from '../../data/factories/UserFactory';

import {
  Tags
} from '../../config/tag.config';


test(
  'invalid credentials are rejected',
  {
    tag: [
      Tags.security,
      Tags.api,
      Tags.nonProd
    ]
  },
  async ({
    userService
  }) => {

    const user =
      UserFactory.create();


    const response =
      await userService
        .verifyLogin(
          user.email,
          'invalid-password'
        );


    expect(
      response.responseCode
    ).not.toBe(200);

  }
);