import {
  test,
  expect
} from '../../fixtures/base.fixture';

import {
  Tags
} from '../../config/tag.config';



test(
  'API returns product list',
  {
    tag: [
      Tags.smoke,
      Tags.api,
      Tags.prodSafe
    ]
  },
  async ({
    productService
  }) => {

    const products =
      await productService
        .getAllProducts();


    expect(
      products.length
    ).toBeGreaterThan(0);


    expect(
      products[0].id
    ).toBeGreaterThan(0);


    expect(
      products[0].name
    ).toBeTruthy();


    expect(
      products[0].price
    ).toBeTruthy();

  }
);