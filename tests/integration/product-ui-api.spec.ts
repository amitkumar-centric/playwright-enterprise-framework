import {
  test,
  expect
} from '../../fixtures/base.fixture';

import {
  ErrorHelper
} from '../../utils';

import {
  Tags
} from '../../config/tag.config';

import * as allure from 'allure-js-commons';

test.skip(
  ({
    browserName
  }) =>
    browserName === 'firefox',
  'Skipped on Firefox because page creation is timing out during setup.'
);


test(
  'product returned by API is visible in UI',
  {
    tag: [
      Tags.integration,
      Tags.api,
      Tags.prodSafe
    ]
  },
  async ({
    productService,
    productsPage,
    logger,
    diagnostics,
  }) => {

        await allure.epic(
      'E-Commerce'
    );

    await allure.feature(
      'Product Catalogue'
    );

    await allure.story(
      'API and UI Product Validation'
    );

    await allure.severity(
      'critical'
    );


    logger.info(
      'Starting API + UI validation'
    );

    logger.info(
      'Starting API + UI product validation'
    );

    let product:
      Awaited<
        ReturnType<typeof productService.getFirstProduct>
      >;

    try {

      product =
        await test.step(
          'Fetch a product from the API',
          async () =>
            productService
              .getFirstProduct()
        );

    } catch (error) {

      throw ErrorHelper.create(
        'Unable to start the product API and UI validation because the product API did not return usable data',
        ErrorHelper.getMessage(
          error
        )
      );

    }


    logger.info(
      `Product selected: ${product.name}`
    );


    try {

      await test.step(
        'Open the Products page and search for the API product',
        async () => {

          await productsPage.goto();

          await productsPage
            .searchProduct(
              product.name
            );

        }
      );


      await test.step(
        'Verify the product name and price are visible in the UI',
        async () => {

          await expect(
            productsPage
              .productName(
                product.name
              )
          ).toBeVisible();


          await expect(
            productsPage
              .productPrice(
                product.price
              )
          ).toBeVisible();

        }
      );

    } catch (error) {

      throw ErrorHelper.create(
        `API returned product "${product.name}", but the UI did not show matching product details`,
        ErrorHelper.getMessage(
          error
        )
      );

    }


    logger.info(
      'API and UI product data matched successfully'
    );

  }
);
