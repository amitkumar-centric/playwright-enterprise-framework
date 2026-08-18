import {
  test,
  expect
} from '../../../fixtures/base.fixture';

import {
  CsvDataLoader
} from '../../../data/loaders/CsvDataLoader';

import {
  EmployeeData
} from '../../../data/models/EmployeeData';

import {
  Tags
} from '../../../config/tag.config';


const employees =
  CsvDataLoader.load<EmployeeData>(
    'data/static/employees.csv'
  );


for (const employee of employees) {

  test(
    `create employee - ${employee.firstName} ${employee.lastName}`,
    {
      tag: [
        Tags.regression,
        Tags.ui,
        Tags.nonProd
      ]
    },
    async ({
      pimPage
    }) => {

      await pimPage.goto();

      await pimPage
        .openAddEmployee();

      await pimPage
        .createEmployee(
          employee.firstName,
          employee.lastName,
          employee.middleName
        );


    }
  );
}