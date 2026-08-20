import {
  APIRequestContext,
  expect
} from '@playwright/test';

import { createBdd } from 'playwright-bdd';

import { test } from 'playwright-bdd';

import { config } from '../../../config/framework.config';

import { ProductsPage } from '../../../pages/ProductsPage';

import { ApiClient } from '../../../services/api/ApiClient';

import { Product } from '../../../services/api/models/Product';

import { ProductService } from '../../../services/api/services/ProductService';

import { ErrorHelper } from '../../../utils';

const { Before, Given, When, Then } = createBdd(test);

let selectedProduct: Product;

Before(async ({ browserName }) => {
  test.skip(
    browserName === 'firefox',
    'Skipped on Firefox because page creation is timing out during setup.'
  );
});

async function createApiContext(playwright: {
  request: {
    newContext: (options: {
      baseURL: string;
      extraHTTPHeaders: Record<string, string>;
    }) => Promise<APIRequestContext>;
  };
}): Promise<APIRequestContext> {
  return playwright.request.newContext({
    baseURL: config.apiUrl,
    extraHTTPHeaders: {
      Accept: 'application/json'
    }
  });
}

Given(
  'the product API returns a valid product',
  async ({ playwright }) => {
    const apiContext = await createApiContext(playwright);

    try {
      const productService = new ProductService(
        new ApiClient(apiContext)
      );

      try {
        selectedProduct = await productService.getFirstProduct();
      } catch (error) {
        throw ErrorHelper.create(
          'Unable to start the API and UI product validation because the product API did not return usable product data',
          ErrorHelper.getMessage(error)
        );
      }
    } finally {
      await apiContext.dispose();
    }
  }
);

When(
  'the user searches for the API product on the products page',
  async ({ page }) => {
    const productsPage = new ProductsPage(page);

    try {
      await productsPage.goto();

      await productsPage.searchProduct(selectedProduct.name);
    } catch (error) {
      throw ErrorHelper.create(
        `The products page could not be searched for API product "${selectedProduct.name}"`,
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

Then(
  'the API product name is visible in the UI',
  async ({ page }) => {
    const productsPage = new ProductsPage(page);

    try {
      await expect(
        productsPage.productName(selectedProduct.name)
      ).toBeVisible();
    } catch (error) {
      throw ErrorHelper.create(
        `API product "${selectedProduct.name}" was not visible in the UI results`,
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

Then(
  'the API product price is visible in the UI',
  async ({ page }) => {
    const productsPage = new ProductsPage(page);

    try {
      await expect(
        productsPage.productPrice(selectedProduct.price)
      ).toBeVisible();
    } catch (error) {
      throw ErrorHelper.create(
        `API product price "${selectedProduct.price}" was not visible in the UI results for "${selectedProduct.name}"`,
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);
