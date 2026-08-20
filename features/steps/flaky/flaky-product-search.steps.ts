import { expect } from '@playwright/test';

import { createBdd } from 'playwright-bdd';

import { test } from 'playwright-bdd';

import { ProductsPage } from '../../../pages/ProductsPage';

import { ErrorHelper } from '../../../utils';

const { Given, When, Then } = createBdd(test);

Given(
  'the user opens the products page for flaky monitoring',
  async ({ page }) => {
    const productsPage = new ProductsPage(page);

    try {
      await productsPage.goto();
    } catch (error) {
      throw ErrorHelper.create(
        'The products page could not be opened for flaky search validation',
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

When(
  'the user searches for flaky product {string}',
  async ({ page }, productName: string) => {
    const productsPage = new ProductsPage(page);

    try {
      await productsPage.searchProduct(productName);
    } catch (error) {
      throw ErrorHelper.create(
        `Flaky search validation could not search for product "${productName}"`,
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

Then(
  'the flaky search results include product {string}',
  async ({ page }, productName: string) => {
    const productsPage = new ProductsPage(page);

    try {
      await expect(
        productsPage.productName(productName)
      ).toBeVisible();
    } catch (error) {
      throw ErrorHelper.create(
        `Flaky search validation did not show expected product "${productName}" in the results`,
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);
