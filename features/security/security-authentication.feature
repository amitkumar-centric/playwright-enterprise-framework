@security @api @non-prod
Feature: Authentication security
  As a security tester
  I want invalid credentials to be rejected
  So that unauthorized access is not granted

  Scenario: Invalid credentials are rejected
    Given the authentication API is available
    When a user attempts login with an invalid password
    Then the authentication request is rejected
