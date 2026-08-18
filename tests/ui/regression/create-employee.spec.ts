import {
  test,
  expect
} from '../../../fixtures/base.fixture';

import {
  Tags
} from '../../../config/tag.config';

import {
  EmployeeFactory
} from '../../../data/factories/EmployeeFactory';


test(
  'admin can create a new employee',
  {
    tag: [
      Tags.regression,
      Tags.critical,
      Tags.ui,
      Tags.nonProd
    ]
  },
  async ({
    loginPage,
    adminCredentials,
    pimPage
  }) => {

    const employee =
      EmployeeFactory.create();

    await loginPage.goto();

    await loginPage.login(
      adminCredentials.username,
      adminCredentials.password
    );


    await pimPage.goto();

    await pimPage.openAddEmployee();


    await pimPage.createEmployee(
      employee.firstName,
      employee.lastName,
      employee.middleName
    );

  }
);
