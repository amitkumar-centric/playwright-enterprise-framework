@security @prod-safe
Feature: HTTPS enforcement
  As a security tester
  I want the application base URL to use HTTPS
  So that traffic is configured to use secure transport

  Scenario: Application uses HTTPS
    Given the application base URL is configured
    Then the application protocol is HTTPS
