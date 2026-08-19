import {
  UserFactory,
  UserTestData
} from '../factories/UserFactory';

import {
  UserData
} from '../models/UserData';

import {
  UserService
} from '../../services/api/services/UserService';

import {
  SeedResult
} from './SeedManager';


export class UserSeeder {

  constructor(
    private readonly userService:
      UserService
  ) {}


  async create():
    Promise<SeedResult<UserData>> {

    const user =
      UserFactory.create() as UserTestData;


    const response =
      await this.userService
        .createAccount(
          user.email,
          user.password,
          user.name
        );


    if (
      response.responseCode !== 201
    ) {

      throw new Error(
        `Unable to seed user: ${response.message}`
      );

    }


    return {

      data:
        user,

      cleanup:
        async () => {

          await this.userService
            .deleteAccount(
              user.email,
              user.password
            );

        }

    };

  }

}
