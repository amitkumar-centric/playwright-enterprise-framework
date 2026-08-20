import { APIRequestContext, expect } from '@playwright/test';

import { createBdd } from 'playwright-bdd';

import { test } from 'playwright-bdd';

import { config } from '../../../config/framework.config';

import { ApiClient } from '../../../services/api/ApiClient';

import { ProductService } from '../../../services/api/services/ProductService';

import { ErrorHelper } from '../../../utils';

const { Given, When, Then } = createBdd(test);

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

Given('the product API client is configured', async ({ playwright }) => {
  const apiContext = await createApiContext(playwright);

  try {
    const productService = new ProductService(new ApiClient(apiContext));

    try {
      const products = await productService.getAllProducts();

      expect(products.length).toBeGreaterThan(0);
    } catch (error) {
      throw ErrorHelper.create(
        'Product API client could not be initialized with a usable product catalogue response',
        ErrorHelper.getMessage(error)
      );
    }
  } finally {
    await apiContext.dispose();
  }
});

When('the client requests the product catalogue', async ({ playwright }) => {
  const apiContext = await createApiContext(playwright);

  try {
    const productService = new ProductService(new ApiClient(apiContext));

    try {
      const products = await productService.getAllProducts();

      expect(products.length).toBeGreaterThan(0);
    } catch (error) {
      throw ErrorHelper.create(
        'Product catalogue request did not return a usable list of products',
        ErrorHelper.getMessage(error)
      );
    }
  } finally {
    await apiContext.dispose();
  }
});

Then('the API returns at least one product', async ({ playwright }) => {
  const apiContext = await createApiContext(playwright);

  try {
    const productService = new ProductService(new ApiClient(apiContext));

    try {
      const products = await productService.getAllProducts();

      expect(products.length).toBeGreaterThan(0);
    } catch (error) {
      throw ErrorHelper.create(
        'Product API did not return any products when at least one product was expected',
        ErrorHelper.getMessage(error)
      );
    }
  } finally {
    await apiContext.dispose();
  }
});

Then(
  'the first product has id, name, and price values',
  async ({ playwright }) => {
    const apiContext = await createApiContext(playwright);

    try {
      const productService = new ProductService(new ApiClient(apiContext));

      const product = await productService.getFirstProduct();

      try {
        expect(product.id).toBeGreaterThan(0);

        expect(product.name).toBeTruthy();

        expect(product.price).toBeTruthy();
      } catch (error) {
        throw ErrorHelper.create(
          'The first product returned by the API was missing required fields',
          `Received product: ${JSON.stringify(product)}. ${ErrorHelper.getMessage(error)}`
        );
      }
    } finally {
      await apiContext.dispose();
    }
  }
);
