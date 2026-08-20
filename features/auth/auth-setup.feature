@auth
Feature: Admin authentication setup
  As a framework user
  I want to authenticate an admin user
  So that authenticated state can be prepared for later flows

  Scenario: Admin can authenticate successfully
    Given the admin login page is opened
    When the admin signs in with valid role credentials
    Then the admin dashboard is displayed
