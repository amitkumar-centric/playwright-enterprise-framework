@regression @ui @flaky @quarantine
Feature: Flaky product search
  As a regression user
  I want product search behavior to be observable under flaky conditions
  So that unstable search scenarios can be monitored separately

  Scenario: Product search displays Blue Top
    Given the user opens the products page for flaky monitoring
    When the user searches for flaky product "Blue Top"
    Then the flaky search results include product "Blue Top"
