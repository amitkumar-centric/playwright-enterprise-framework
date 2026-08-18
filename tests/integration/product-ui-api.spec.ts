import {
  test,
  expect
} from '../../fixtures/base.fixture';

import {
  Tags
} from '../../config/tag.config';

import * as allure from 'allure-js-commons';


test(
  'product returned by API is visible in UI',
  {
    tag: [
      Tags.regression,
      Tags.integration,
      Tags.api,
      Tags.ui,
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


    const product =
      await productService
        .getFirstProduct();


    logger.info(
      `Product selected: ${product.name}`
    );


    await productsPage.goto();


    await productsPage
      .searchProduct(
        product.name
      );


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


    logger.info(
      'API and UI product data matched successfully'
    );

  }
);
