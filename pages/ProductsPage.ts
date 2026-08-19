import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  readonly allProductsHeading: Locator;

  readonly searchInput: Locator;

  readonly searchButton: Locator;

  readonly searchedProductsHeading: Locator;

  constructor(private readonly page: Page) {
    this.allProductsHeading = page.getByText('All Products', {
      exact: true
    });

    this.searchInput = page.locator('#search_product');

    this.searchButton = page.locator('#submit_search');

    this.searchedProductsHeading = page.getByText('Searched Products', {
      exact: true
    });
  }

  async goto(): Promise<void> {
    await this.page.goto('/products');
  }

  async searchProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);

    await this.searchButton.click();
  }

  productName(productName: string): Locator {
    return this.page
      .getByText(productName, {
        exact: true
      })
      .first();
  }

  productPrice(price: string): Locator {
    return this.page
      .getByText(price, {
        exact: true
      })
      .first();
  }
}
