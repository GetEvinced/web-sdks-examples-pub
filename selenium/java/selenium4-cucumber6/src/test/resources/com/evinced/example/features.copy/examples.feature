Feature: Examples of Evinced usage in Cucumber Scenarios
  @testInformation
  Scenario: Test versions information
    Given I print the versions information

  Scenario: Example without Evinced SDK - As a user I want to choose the stay and see proper results
    Given I am on "https://demo.evinced.com"
    And I click on "HOUSE_DROPDOWN"
    And I click on "TENT_OPTION"
    And I click on "LOCATION_DROPDOWN"
    And I click on "CANADA_OPTION"
    And I click on "SEARCH_BUTTON"
    Then "SEARCH_RESULTS" should contain "Tent in Canada"

  Scenario: Example with evAnalyze - I want to snapshot all issues on home page with evAnalyze and save report as json
    Given I am on "https://demo.evinced.com"
    And I click on "HOUSE_DROPDOWN"
    And I click on "TENT_OPTION"
    And I click on "LOCATION_DROPDOWN"
    And I click on "CANADA_OPTION"
    And I run evAnalyze command
    And I click on "SEARCH_BUTTON"
    And I run evSaveFile command in "json" format and save it as "evAnalyzeReport"
    Then "SEARCH_RESULTS" should contain "Tent in Canada"

  Scenario: Example with evStart-evStop - As a user I want to record all accessibility issues during my interaction with page
    Given I am on "https://demo.evinced.com"
    And I run evStart command
    And I click on "HOUSE_DROPDOWN"
    And I click on "TENT_OPTION"
    And I click on "LOCATION_DROPDOWN"
    And I click on "CANADA_OPTION"
    And I click on "SEARCH_BUTTON"
    And I run evStop command
    Then "SEARCH_RESULTS" should contain "Tent in Canada"
    # This step is intended to fail to demonstrate how to assert accessibility issues
    And There should be no accessibility issues found

  @evinced_hooks_integration
  Scenario: Example with before-after hooks - As a user I want to record all accessibility issues and save the report
    Given I am on "https://demo.evinced.com"
    And I click on "HOUSE_DROPDOWN"
    And I click on "TENT_OPTION"
    And I click on "LOCATION_DROPDOWN"
    And I click on "CANADA_OPTION"
    And I click on "SEARCH_BUTTON"
    Then "SEARCH_RESULTS" should contain "Tent in Canada"

  @evinced_hooks_integration @aggregated_report
  Scenario: Example with aggregated report in hooks - As a user I want to record all accessibility issues and save the report
    Given I am on "https://demo.evinced.com"
    And I click on "HOUSE_DROPDOWN"
    And I click on "TENT_OPTION"
    And I click on "LOCATION_DROPDOWN"
    And I click on "EAST_COAST_OPTION"
    And I click on "SEARCH_BUTTON"
    Then "SEARCH_RESULTS" should contain "Tent in East Coast"
    
  Scenario: Example with different configuration - As a user I want to record all issues occuring in a given root selector
    Given I am on "https://demo.evinced.com"
    When I set the root selector to "HOUSE_DROPDOWN"
    And I run evStart command
    And I click on "HOUSE_DROPDOWN"
    And I click on "TENT_OPTION"
    And I click on "LOCATION_DROPDOWN"
    And I click on "CANADA_OPTION"
    And I click on "SEARCH_BUTTON"
    And I run evStop command
    And I run evSaveFile command in "html" format and save it as "rootSelectorReport"
    Then "SEARCH_RESULTS" should contain "Tent in Canada"
