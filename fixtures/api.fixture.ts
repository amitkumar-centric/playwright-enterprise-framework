import { test as base, APIRequestContext } from '@playwright/test';

import { ApiClient } from '../services/api/ApiClient';

import { config } from '../config/framework.config';

import { IdHelper } from '../utils/IdHelper';

type ApiFixtures = {
  correlationId: string;

  apiContext: APIRequestContext;

  apiClient: ApiClient;
};

export const apiTest = base.extend<ApiFixtures>({
  correlationId: async ({}, use) => {
    await use(IdHelper.createCorrelationId());
  },

  apiContext: async ({ playwright, correlationId }, use) => {
    const context = await playwright.request.newContext({
      baseURL: config.apiUrl,

      extraHTTPHeaders: {
        Accept: 'application/json',
        'X-Correlation-Id': correlationId
      }
    });

    await use(context);

    await context.dispose();
  },

  apiClient: async ({ apiContext }, use) => {
    await use(new ApiClient(apiContext));
  }
});
