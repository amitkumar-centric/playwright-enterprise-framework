@regression @ui @non-prod
Feature: Login validation with test data
  As a regression tester
  I want to validate login behavior with different credential sets
  So that both successful and failed login paths are verified

  Scenario Outline: Login validation for named test data
    Given the login page is ready for data-driven validation
    When the user signs in using login data "<name>"
    Then the login result matches "<expectedResult>"

    Examples:
      | name         | expectedResult |
      | valid admin  | success        |
      | invalid user | failure        |
