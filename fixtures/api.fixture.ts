import {
  test as base,
  APIRequestContext
} from '@playwright/test';

import {
  ApiClient
} from '../services/api/ApiClient';

import {
  config
} from '../config/framework.config';


type ApiFixtures = {

  apiContext:
    APIRequestContext;

  apiClient:
    ApiClient;

};


export const apiTest =
  base.extend<ApiFixtures>({

    apiContext:
      async ({
        playwright
      }, use) => {

        const context =
          await playwright
            .request
            .newContext({

              baseURL:
                config.apiUrl,

              extraHTTPHeaders: {

                Accept:
                  'application/json'

              }

            });


        await use(context);


        await context.dispose();

      },


    apiClient:
      async ({
        apiContext
      }, use) => {

        await use(
          new ApiClient(
            apiContext
          )
        );

      }

  });