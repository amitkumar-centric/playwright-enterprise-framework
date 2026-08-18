import {
  ApiClient
} from '../ApiClient';

import {
  Product,
  ProductListResponse
} from '../models/Product';


export class ProductService {

  constructor(
    private readonly api:
      ApiClient
  ) {}


  async getAllProducts():
    Promise<Product[]> {

    const response =
      await this.api
        .get<ProductListResponse>(
          'productsList'
        );


    if (!response.ok) {

      throw new Error(
        `Unable to retrieve products. HTTP status: ${response.status}`
      );

    }


    if (!response.data) {

      throw new Error(
        'Product API returned no response body.'
      );

    }


    if (
      response.data.responseCode !== 200
    ) {

      throw new Error(
        `Product API returned responseCode ${response.data.responseCode}`
      );

    }


    return response.data.products;
  }


  async getProductById(
    id: number
  ): Promise<Product> {

    const products =
      await this.getAllProducts();


    const product =
      products.find(
        item => item.id === id
      );


    if (!product) {

      throw new Error(
        `Product with id ${id} was not found.`
      );

    }


    return product;
  }


  async getFirstProduct():
    Promise<Product> {

    const products =
      await this.getAllProducts();


    if (
      products.length === 0
    ) {

      throw new Error(
        'No products returned from API.'
      );

    }


    return products[0];
  }
}