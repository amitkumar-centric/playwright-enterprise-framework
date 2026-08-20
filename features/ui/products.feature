@smoke @ui @prod-safe
Feature: Products page

  Scenario: User views the products listing
    Given the user opens the products page
    Then the all products heading is displayed

  Scenario: User searches for a product
    Given the user opens the products page
    When the user searches for "Blue Top"
    Then the searched products heading is displayed
    And the product "Blue Top" is visible in the results
