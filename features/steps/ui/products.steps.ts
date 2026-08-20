import { expect } from '@playwright/test';

import { createBdd } from 'playwright-bdd';

import { test } from 'playwright-bdd';

import { ProductsPage } from '../../../pages/ProductsPage';

import { ErrorHelper } from '../../../utils';

const { Given, When, Then } = createBdd(test);

Given('the user opens the products page', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.goto();
});

When('the user searches for {string}', async ({ page }, productName: string) => {
  const productsPage = new ProductsPage(page);

  await productsPage.searchProduct(productName);
});

Then('the all products heading is displayed', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  try {
    await expect(productsPage.allProductsHeading).toBeVisible();
  } catch (error) {
    throw ErrorHelper.create(
      'Products page did not load correctly because the "All Products" heading was not visible',
      `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
    );
  }
});

Then('the searched products heading is displayed', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  try {
    await expect(productsPage.searchedProductsHeading).toBeVisible();
  } catch (error) {
    throw ErrorHelper.create(
      'Product search did not complete because the "Searched Products" heading was not visible',
      `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
    );
  }
});

Then(
  'the product {string} is visible in the results',
  async ({ page }, productName: string) => {
    const productsPage = new ProductsPage(page);

    try {
      await expect(productsPage.productName(productName)).toBeVisible();
    } catch (error) {
      throw ErrorHelper.create(
        `Product search results did not show the expected product "${productName}"`,
        `The search completed but the expected product was not visible on the results page. Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);
