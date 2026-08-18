import { faker } from '@faker-js/faker';

export interface EmployeeData {
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId: string;
}

export class EmployeeFactory {

  static create(
    overrides: Partial<EmployeeData> = {}
  ): EmployeeData {

    const uniqueSuffix =
      faker.string.alphanumeric({
        length: 6,
        casing: 'upper'
      });

    return {

      firstName:
        faker.person.firstName(),

      middleName:
        faker.person.middleName(),

      lastName:
        `${faker.person.lastName()}-${uniqueSuffix}`,

      employeeId:
        faker.string.numeric(6),

      ...overrides

    };
  }
}
