import { ApiClient } from '../ApiClient';

import { ApiResponse } from '../ApiResponse';

import { Product, ProductListResponse } from '../models/Product';

export class ProductService {
  private static readonly transientStatuses = [502, 503, 504, 525] as const;

  constructor(private readonly api: ApiClient) {}

  async getAllProducts(): Promise<Product[]> {
    const response = await this.getProductsListResponse();

    if (!response.ok) {
      throw new Error(
        `Product API request failed while retrieving the product catalogue. ` +
          `Endpoint: productsList. HTTP status: ${response.status}. ` +
          `This usually means the API is temporarily unavailable or rejected the request.`
      );
    }

    if (!response.data) {
      throw new Error(
        'Product API returned an empty or unreadable response body for productsList.'
      );
    }

    if (response.data.responseCode !== 200) {
      throw new Error(
        `Product API returned an unexpected business response code ` +
          `${response.data.responseCode} for productsList.`
      );
    }

    return response.data.products;
  }

  private async getProductsListResponse(): Promise<
    ApiResponse<ProductListResponse>
  > {
    let lastResponse: ApiResponse<ProductListResponse> | undefined;

    for (let attempt = 1; attempt <= 3; attempt++) {
      const response = await this.api.get<ProductListResponse>('productsList');

      lastResponse = response;

      if (
        response.ok ||
        !ProductService.transientStatuses.includes(
          response.status as (typeof ProductService.transientStatuses)[number]
        )
      ) {
        return response;
      }

      await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
    }

    return lastResponse!;
  }

  async getProductById(id: number): Promise<Product> {
    const products = await this.getAllProducts();

    const product = products.find((item) => item.id === id);

    if (!product) {
      throw new Error(
        `Product with id ${id} was not found in the API product catalogue.`
      );
    }

    return product;
  }

  async getFirstProduct(): Promise<Product> {
    const products = await this.getAllProducts();

    if (products.length === 0) {
      throw new Error(
        'The product API returned zero products, so UI comparison could not continue.'
      );
    }

    return products[0];
  }
}
