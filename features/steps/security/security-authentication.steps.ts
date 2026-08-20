import { expect } from '@playwright/test';

import { createBdd } from 'playwright-bdd';

import { test } from 'playwright-bdd';

import { config } from '../../../config/framework.config';

import { UserFactory } from '../../../data/factories/UserFactory';

import { ApiClient } from '../../../services/api/ApiClient';

import { UserService } from '../../../services/api/services/UserService';

import { ErrorHelper } from '../../../utils';

const { Given, When, Then } = createBdd(test);

let authenticationResponseCode: number | undefined;

Given(
  'the authentication API is available',
  async () => {
    authenticationResponseCode = undefined;
  }
);

When(
  'a user attempts login with an invalid password',
  async ({ playwright }) => {
    const user = UserFactory.create();

    const apiContext =
      await playwright.request.newContext({
        baseURL: config.apiUrl
      });

    try {
      const userService =
        new UserService(
          new ApiClient(apiContext)
        );

      try {
        const response =
          await userService.verifyLogin(
            user.email,
            'invalid-password'
          );

        authenticationResponseCode =
          response.responseCode;
      } catch (error) {
        throw ErrorHelper.create(
          'Authentication security validation could not complete the invalid login request',
          ErrorHelper.getMessage(error)
        );
      }
    } finally {
      await apiContext.dispose();
    }
  }
);

Then(
  'the authentication request is rejected',
  async () => {
    try {
      expect(
        authenticationResponseCode
      ).not.toBe(200);
    } catch (error) {
      throw ErrorHelper.create(
        'Authentication security validation failed because invalid credentials were not rejected',
        `Received response code: ${authenticationResponseCode}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);
