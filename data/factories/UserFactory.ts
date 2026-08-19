import { faker } from '@faker-js/faker';

export interface UserTestData {
  name: string;

  email: string;

  password: string;
}

export class UserFactory {
  static create(overrides: Partial<UserTestData> = {}): UserTestData {
    const firstName = faker.person.firstName();

    const lastName = faker.person.lastName();

    return {
      name: `${firstName} ${lastName}`,

      email: faker.internet.email({
        firstName,
        lastName
      }),

      password: faker.internet.password({
        length: 12
      }),

      ...overrides
    };
  }

  static createMany(count: number): UserTestData[] {
    return Array.from(
      {
        length: count
      },
      () => this.create()
    );
  }
}
