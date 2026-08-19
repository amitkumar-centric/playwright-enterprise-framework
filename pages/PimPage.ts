import {
  Page,
  Locator
} from '@playwright/test';

import {
  config
} from '../config/framework.config';

import {
  ErrorHelper
} from '../utils';

import {
  faker
} from '@faker-js/faker';


export class PimPage {

  private static buildOrangeHrmUrl(
    path: string
  ): string {

    return new URL(
      path,
      config.baseUrl
    ).toString();
  }

  readonly addEmployeeMenu:
    Locator;

  readonly firstNameInput:
    Locator;

  readonly middleNameInput:
    Locator;

  readonly lastNameInput:
    Locator;

  readonly employeeIdInput:
    Locator;

  readonly saveButton:
    Locator;

  readonly personalDetailsHeading:
    Locator;

  readonly formLoader:
    Locator;


  constructor(
    private readonly page:
      Page
  ) {

    this.addEmployeeMenu =
      page.getByText(
        'Add Employee',
        {
          exact: true
        }
      );

    this.firstNameInput =
      page.getByPlaceholder(
        'First Name'
      );

    this.middleNameInput =
      page.getByPlaceholder(
        'Middle Name'
      );

    this.lastNameInput =
      page.getByPlaceholder(
        'Last Name'
      );

    this.employeeIdInput =
      page
        .locator(
          'label:has-text("Employee Id")'
        )
        .locator('..')
        .locator('..')
        .locator('input');

    this.saveButton =
      page.getByRole(
        'button',
        {
          name: 'Save'
        }
      );

    this.personalDetailsHeading =
      page.getByRole(
        'heading',
        {
          name: 'Personal Details'
        }
      );

    this.formLoader =
      page.locator(
        '.oxd-form-loader'
      );
  }


  private async waitForLoaderToSettle():
    Promise<void> {

    await this.formLoader
      .waitFor({
        state: 'hidden'
      });
  }


  async goto():
    Promise<void> {

    await this.page.goto(
      '/web/index.php/pim/viewEmployeeList'
    );
  }


  async gotoOrangeHrmEmployeeList():
    Promise<void> {

    await this.page.goto(
      PimPage.buildOrangeHrmUrl(
        '/web/index.php/pim/viewEmployeeList'
      )
    );

    await this.addEmployeeMenu
      .waitFor();

    await this.waitForLoaderToSettle();
  }


  async openAddEmployee():
    Promise<void> {

    try {

      await this.gotoOrangeHrmEmployeeList();

      await this.addEmployeeMenu
        .click();

      await this.firstNameInput
        .waitFor();

      await this.waitForLoaderToSettle();

    } catch (error) {

      throw ErrorHelper.create(
        'Unable to open Add Employee page',
        ErrorHelper.getMessage(
          error
        )
      );

    }
  }


  async createEmployee(
    firstName: string,
    lastName: string,
    middleName?: string,
    employeeId?: string
  ): Promise<void> {

    try {

      await this
        .firstNameInput
        .fill(firstName);

      if (
        middleName
      ) {

        await this
          .middleNameInput
          .fill(
            middleName
          );

      }

      await this
        .lastNameInput
        .fill(lastName);

      await this
        .employeeIdInput
        .fill(
          employeeId
          ?? faker.string.numeric(6)
        );

      await this.waitForLoaderToSettle();

      await Promise.all([
        this.page.waitForURL(
          /\/web\/index\.php\/pim\/viewPersonalDetails\/empNumber\/\d+/,
          {
            waitUntil: 'domcontentloaded',
            timeout: 60_000
          }
        ),
        this.saveButton.click({
          force: true
        })
      ]);

      await this.waitForLoaderToSettle();

    } catch (error) {

      throw ErrorHelper.create(
        `Unable to create employee "${firstName} ${lastName}"`,
        ErrorHelper.getMessage(
          error
        )
      );

    }
  }
}
