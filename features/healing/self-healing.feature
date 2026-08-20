@smoke @ui
Feature: Self-healing login locator
  As a framework maintainer
  I want locator fallback recovery to work
  So that a broken primary locator can still recover through a valid fallback

  Scenario: Self-healing recovers from a broken login button locator
    Given the user opens the OrangeHRM login page for self-healing validation
    When the user signs in through the self-healing login button flow
    Then the OrangeHRM dashboard is displayed after self-healing
