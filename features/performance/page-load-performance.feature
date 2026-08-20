@performance @ui @prod-safe
Feature: Products page performance
  As a user
  I want the products page to load within the acceptable threshold
  So that the application remains responsive

  Scenario: Products page loads within the performance threshold
    Given the user opens the products page for performance validation
    When the page performance metrics are captured
    Then the products page load duration is within the configured threshold
