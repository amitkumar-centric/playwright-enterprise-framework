@regression @ui @non-prod
Feature: Employee creation with CSV data
  As a regression tester
  I want to create employees from CSV-driven data
  So that multiple employee inputs are validated consistently

  Scenario Outline: Admin creates an employee from CSV data
    Given the admin is logged into the employee management application for CSV employee creation
    When the admin creates employee record from CSV data "<firstName>" "<middleName>" "<lastName>"
    Then the employee personal details page is displayed for CSV employee creation

    Examples:
      | firstName | middleName | lastName |
      | Amit      | Kumar      | Singh    |
      | John      | Michael    | Smith    |
      | Priya     | Rani       | Sharma   |
