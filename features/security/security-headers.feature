@security @prod-safe
Feature: Security headers
  As a security tester
  I want the application to expose baseline security headers
  So that browsers receive minimum hardening signals

  Scenario: Application exposes baseline security headers
    Given the application home page is requested for security header validation
    Then the response includes baseline security headers
