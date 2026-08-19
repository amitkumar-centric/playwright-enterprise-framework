import {
  test,
  expect
} from '../../../fixtures/base.fixture';

import {
  config
} from '../../../config/framework.config';

import {
  Tags
} from '../../../config/tag.config';

import {
  EmployeeFactory
} from '../../../data/factories/EmployeeFactory';

const isOrangeHrm =
  new URL(
    config.baseUrl
  ).hostname.includes(
    'orangehrmlive.com'
  );

test.skip(
  ({
    browserName
  }) =>
    browserName === 'firefox',
  'Skipped on Firefox because browser context setup is timing out in this environment.'
);


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
    page,
    loginPage,
    adminCredentials,
    pimPage
  }) => {

    const employee =
      EmployeeFactory.create();

    if (isOrangeHrm) {

      await loginPage.gotoOrangeHrm();

      await loginPage.loginToOrangeHrm(
        adminCredentials.username,
        adminCredentials.password
      );

      await expect(
        page.getByRole(
          'link',
          {
            name: 'Dashboard'
          }
        )
      ).toBeVisible();

    } else {

      await loginPage.goto();

      await loginPage.login(
        adminCredentials.username,
        adminCredentials.password
      );

    }

    await pimPage.goto();

    await pimPage.openAddEmployee();


    await pimPage.createEmployee(
      employee.firstName,
      employee.lastName,
      employee.middleName
    );

  }
);
