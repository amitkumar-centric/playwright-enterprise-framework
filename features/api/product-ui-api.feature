@integration @api @prod-safe
Feature: Product API and UI integration
  As a user of the product catalogue
  I want a product returned by the API to be visible in the UI
  So that the API data and UI display stay aligned

  Scenario: Product returned by API is visible in UI
    Given the product API returns a valid product
    When the user searches for the API product on the products page
    Then the API product name is visible in the UI
    And the API product price is visible in the UI
