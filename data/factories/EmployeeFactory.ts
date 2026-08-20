import { faker } from '@faker-js/faker';

import { EmployeeData, EmployeeDataVersion } from '../models/EmployeeData';

const employeeVersionPresets: Record<
  EmployeeDataVersion,
  Omit<EmployeeData, 'employeeId'>
> = {
  v1: {
    firstName: 'Amit',
    middleName: 'Kumar',
    lastName: 'VersionOne'
  },
  v2: {
    firstName: 'Priya',
    middleName: 'Sharma',
    lastName: 'VersionTwo'
  }
};

export class EmployeeFactory {
  static create(overrides: Partial<EmployeeData> = {}): EmployeeData {
    const uniqueSuffix = faker.string.alphanumeric({
      length: 6,
      casing: 'upper'
    });

    return {
      firstName: faker.person.firstName(),

      middleName: faker.person.middleName(),

      lastName: `${faker.person.lastName()}-${uniqueSuffix}`,

      employeeId: faker.string.numeric(6),

      ...overrides
    };
  }

  static createVersion(
    version: EmployeeDataVersion,
    overrides: Partial<EmployeeData> = {}
  ): EmployeeData {
    const preset = employeeVersionPresets[version];

    return EmployeeFactory.create({
      ...preset,
      lastName: `${preset.lastName}-${version.toUpperCase()}`,
      ...overrides
    });
  }
}
