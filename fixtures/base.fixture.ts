import {
  test as base,
  expect
} from '@playwright/test';

import {
  LoginPage
} from '../pages/LoginPage';

import {
  DashboardPage
} from '../pages/DashboardPage';

import {
  PimPage
} from '../pages/PimPage';

import {
  ProductsPage
} from '../pages/ProductsPage';

import {
  Credentials,
  getAdminCredentials
} from './credential.fixture';

import {
  ApiClient
} from '../services/api/ApiClient';

import {
  ProductService
} from '../services/api/services/ProductService';

import {
  UserService
} from '../services/api/services/UserService';

import {
  config
} from '../config/framework.config';

import {
  Logger
} from '../utils/logger/Logger';

import {
  IdHelper
} from '../utils/IdHelper';

import {
  setupDiagnostics,
  attachDiagnostics
} from './diagnostics.fixture';

type FrameworkFixtures = {

  loginPage:
    LoginPage;

  dashboardPage:
    DashboardPage;

  pimPage:
    PimPage;

  productsPage:
    ProductsPage;

  adminCredentials:
    Credentials;

  apiClient:
    ApiClient;

  productService:
    ProductService;

  userService:
    UserService;

  logger:
    Logger;

  correlationId:
    string;

    diagnostics:
  void;

};


export const test =
  base.extend<FrameworkFixtures>({

    loginPage:
      async ({ page }, use) => {

        await use(
          new LoginPage(page)
        );

      },


    dashboardPage:
      async ({ page }, use) => {

        await use(
          new DashboardPage(page)
        );

      },


    pimPage:
      async ({ page }, use) => {

        await use(
          new PimPage(page)
        );

      },


    productsPage:
      async ({ page }, use) => {

        await use(
          new ProductsPage(page)
        );

      },

      
    adminCredentials:
      async ({}, use) => {

        await use(
          await getAdminCredentials()
        );

      },


    apiClient:
      async ({
        playwright
      }, use) => {

        const apiContext =
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


        await use(
          new ApiClient(
            apiContext
          )
        );


        await apiContext.dispose();

      },


    productService:
      async ({
        apiClient
      }, use) => {

        await use(
          new ProductService(
            apiClient
          )
        );

      },


    userService:
      async ({
        apiClient
      }, use) => {

        await use(
          new UserService(
            apiClient
          )
        );

      },


    correlationId:
      async ({}, use) => {

        await use(
          IdHelper.createCorrelationId()
        );

      },


    logger:
      async ({
        correlationId
      }, use) => {

        await use(
          new Logger(
            correlationId
          )
        );

      },

  diagnostics:
  async ({
    page
  }, use, testInfo) => {

    const diagnostics =
      await setupDiagnostics(
        page,
        testInfo
      );


    await use();


    await attachDiagnostics(
      page,
      diagnostics,
      testInfo
    );

  },

  });


export {
  expect
};
