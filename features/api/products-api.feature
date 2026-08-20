@smoke @api @prod-safe
Feature: Product API
  As an API client
  I want to request the product catalogue
  So that I can validate product data is available

  Scenario: Product catalogue is returned by the API
    Given the product API client is configured
    When the client requests the product catalogue
    Then the API returns at least one product
    And the first product has id, name, and price values
