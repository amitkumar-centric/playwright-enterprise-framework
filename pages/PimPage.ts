import {
  Page,
  Locator
} from '@playwright/test';

import {
  ErrorHelper
} from '../utils';


export class PimPage {

  readonly addEmployeeMenu:
    Locator;

  readonly firstNameInput:
    Locator;

  readonly middleNameInput:
    Locator;

  readonly lastNameInput:
    Locator;

  readonly saveButton:
    Locator;

  readonly personalDetailsHeading:
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

    this.saveButton =
      page.getByRole(
        'button',
        {
          name: 'Save'
        }
      );

    this.personalDetailsHeading =
      page.getByText(
        'Personal Details',
        {
          exact: true
        }
      );
  }


  async goto():
    Promise<void> {

    await this.page.goto(
      '/web/index.php/pim/viewEmployeeList'
    );
  }


  async openAddEmployee():
    Promise<void> {

    try {

      await this
        .addEmployeeMenu
        .click();

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
    middleName?: string
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
        .saveButton
        .click();

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