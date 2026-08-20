@ui @mobile @responsive @regression @prod-safe
Feature: Products page mobile responsiveness
  As a mobile user
  I want the products page to render correctly on a small viewport
  So that the catalogue remains usable on mobile devices

  Scenario: Products page renders correctly on mobile viewport
    Given the products page is opened on a mobile viewport
    Then the products page heading is visible on mobile
    And the mobile viewport width is less than 800 pixels
    And at least one product card is visible on mobile
