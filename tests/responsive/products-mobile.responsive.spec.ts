import {
  test,
  expect
} from '../../fixtures/base.fixture';

import {
  Tags
} from '../../config/tag.config';


test(
  'products page renders correctly on mobile viewport',
  {
    tag: [
      Tags.ui,
      Tags.mobile,
      Tags.responsive,
      Tags.regression,
      Tags.prodSafe
    ]
  },
  async ({
    page,
    logger,
    diagnostics: _diagnostics
  }) => {

    logger.info(
      'Starting mobile responsive validation'
    );


    await page.goto(
      'https://automationexercise.com/products'
    );


    // ==============================
    // Verify main heading
    // ==============================

    await expect(
      page.getByRole(
        'heading',
        {
          name: /All Products/i
        }
      )
    ).toBeVisible();


    // ==============================
    // Verify viewport
    // ==============================

    const viewport =
      page.viewportSize();


    expect(
      viewport
    ).not.toBeNull();


    logger.info(
      `Viewport width=${viewport?.width}, height=${viewport?.height}`
    );


    expect(
      viewport!.width
    ).toBeLessThan(
      800
    );


    // ==============================
    // Verify products are visible
    // ==============================

    const products =
      page.locator(
        '.product-image-wrapper'
      );


    await expect(
      products.first()
    ).toBeVisible();


    logger.info(
      'Mobile responsive validation completed'
    );

  }
);
