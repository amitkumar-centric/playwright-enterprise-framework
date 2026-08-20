import {
  expect,
  Page
} from '@playwright/test';

import { createBdd } from 'playwright-bdd';

import { test } from 'playwright-bdd';

import { ErrorHelper } from '../../../utils';

const { Given, Then } = createBdd(test);

function productCards(
  page: Page
) {
  return page.locator(
    '.product-image-wrapper'
  );
}

Given(
  'the products page is opened on a mobile viewport',
  async ({ page }) => {
    try {
      await page.setViewportSize({
        width: 390,
        height: 844
      });

      await page.goto(
        'https://automationexercise.com/products'
      );
    } catch (error) {
      throw ErrorHelper.create(
        'The products page could not be opened on a mobile viewport',
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

Then(
  'the products page heading is visible on mobile',
  async ({ page }) => {
    try {
      await expect(
        page.getByRole(
          'heading',
          {
            name: /All Products/i
          }
        )
      ).toBeVisible();
    } catch (error) {
      throw ErrorHelper.create(
        'Mobile responsive validation failed because the products page heading was not visible',
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

Then(
  'the mobile viewport width is less than 800 pixels',
  async ({ page }) => {
    const viewport =
      page.viewportSize();

    try {
      expect(
        viewport
      ).not.toBeNull();

      expect(
        viewport!.width
      ).toBeLessThan(
        800
      );
    } catch (error) {
      throw ErrorHelper.create(
        'Mobile responsive validation failed because the viewport width was not within the expected mobile range',
        `Viewport width: ${viewport?.width ?? 'unknown'}, height: ${viewport?.height ?? 'unknown'}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);

Then(
  'at least one product card is visible on mobile',
  async ({ page }) => {
    try {
      await expect(
        productCards(page).first()
      ).toBeVisible();
    } catch (error) {
      throw ErrorHelper.create(
        'Mobile responsive validation failed because no product card was visible on the products page',
        `Current URL: ${page.url()}. ${ErrorHelper.getMessage(error)}`
      );
    }
  }
);
