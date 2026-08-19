import { test } from '../../../fixtures/base.fixture';

import { CsvDataLoader } from '../../../data/loaders/CsvDataLoader';

import { EmployeeData } from '../../../data/models/EmployeeData';

import { Tags } from '../../../config/tag.config';

const employees = CsvDataLoader.load<EmployeeData>('data/static/employees.csv');

test.skip(
  ({ browserName }) => browserName === 'firefox',
  'Skipped on Firefox because browser context setup is timing out in this environment.'
);

for (const employee of employees) {
  test(
    `create employee - ${employee.firstName} ${employee.lastName}`,
    {
      tag: [Tags.regression, Tags.ui, Tags.nonProd]
    },
    async ({ pimPage }) => {
      await pimPage.goto();

      await pimPage.openAddEmployee();

      await pimPage.createEmployee(
        employee.firstName,
        employee.lastName,
        employee.middleName
      );
    }
  );
}
