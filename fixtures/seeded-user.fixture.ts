import {
  UserData
} from '../data/models/UserData';

import {
  UserSeeder
} from '../data/seed/UserSeeder';

import {
  UserService
} from '../services/api/services/UserService';


export async function createSeededUser(
  userService:
    UserService
): Promise<{
  user: UserData;
  cleanup: () => Promise<void>;
}> {

  const seeder =
    new UserSeeder(
      userService
    );


  const result =
    await seeder.create();


  return {

    user:
      result.data,

    cleanup:
      result.cleanup

  };

}
