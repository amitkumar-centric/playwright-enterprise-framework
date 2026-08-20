@regression @critical @ui @non-prod
Feature: Employee management
  As an admin user
  I want to create an employee record
  So that the employee can be managed in the application

  Scenario: Admin creates a new employee
    Given the admin is logged into the employee management application
    When the admin creates a new employee record using data version "v1"
    Then the personal details page is displayed
