import { test, expect } from '../../fixtures/base.fixture';

import { Tags } from '../../config/tag.config';

import { ErrorHelper } from '../../utils';

test(
  'API returns product list',
  {
    tag: [Tags.smoke, Tags.api, Tags.prodSafe]
  },
  async ({ productService }) => {
    try {
      const products = await productService.getAllProducts();

      expect(products.length).toBeGreaterThan(0);

      expect(products[0].id).toBeGreaterThan(0);

      expect(products[0].name).toBeTruthy();

      expect(products[0].price).toBeTruthy();
    } catch (error) {
      throw ErrorHelper.create(
        'Product catalogue API did not return a valid first product',
        ErrorHelper.getMessage(error)
      );
    }
  }
);
