import {
  ApiClient
} from '../ApiClient';

import {
  VerifyLoginResponse
  ,
  AccountMutationResponse
} from '../models/User';


export class UserService {

  constructor(
    private readonly api:
      ApiClient
  ) {}


  async createAccount(
    email: string,
    password: string,
    name = 'QA User'
  ): Promise<AccountMutationResponse> {

    const response =
      await this.api.post<AccountMutationResponse>(
        'createAccount',
        this.toFormBody({
          name,
          email,
          password,
          title: 'Mr',
          birth_date: '1',
          birth_month: 'January',
          birth_year: '1990',
          firstname: 'QA',
          lastname: 'User',
          company: 'OpenAI',
          address1: '123 Test Street',
          address2: 'Suite 1',
          country: 'India',
          zipcode: '560001',
          state: 'Karnataka',
          city: 'Bengaluru',
          mobile_number: '9999999999'
        }),
        {
          'Content-Type':
            'application/x-www-form-urlencoded'
        }
      );


    if (!response.data) {

      throw new Error(
        'Create Account API returned no response body.'
      );

    }


    return response.data;
  }


  async verifyLogin(
    email: string,
    password: string
  ): Promise<VerifyLoginResponse> {

    const response =
      await this.api.post<VerifyLoginResponse>(
        'verifyLogin',
        new URLSearchParams({
          email,
          password
        }).toString(),
        {
          'Content-Type':
            'application/x-www-form-urlencoded'
        }
      );


    if (!response.data) {

      throw new Error(
        'Verify Login API returned no response body.'
      );

    }


    return response.data;
  }


  async deleteAccount(
    email: string,
    password: string
  ): Promise<AccountMutationResponse> {

    const response =
      await this.api.delete<AccountMutationResponse>(
        'deleteAccount',
        this.toFormBody({
          email,
          password
        }),
        {
          'Content-Type':
            'application/x-www-form-urlencoded'
        }
      );


    if (!response.data) {

      throw new Error(
        'Delete Account API returned no response body.'
      );

    }


    return response.data;
  }


  private toFormBody(
    data: Record<string, string>
  ): string {

    return new URLSearchParams(data)
      .toString();
  }

}
