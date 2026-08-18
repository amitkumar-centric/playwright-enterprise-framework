import {
  ApiClient
} from '../ApiClient';

import {
  VerifyLoginResponse
} from '../models/User';


export class UserService {

  constructor(
    private readonly api:
      ApiClient
  ) {}


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

}
