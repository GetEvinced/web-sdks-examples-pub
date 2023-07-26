Feature: Examples of Evinced usage in Cucumber Scenarios
  @testInformation
  Scenario: Test versions information
    Given I print the versions information

  @withoutEvincedSDK
  Scenario: Test without Evinced SDK example
    Given I am on "https://demo.evinced.com"
    And I click on "HOUSE_DROPDOWN"
    And I click on "TENT_OPTION"
    And I click on "LOCATION_DROPDOWN"
    And I click on "CANADA_OPTION"
    And I click on "SEARCH_BUTTON"
    Then "SEARCH_RESULTS" should contain "Tent in Canada"

  Scenario: Test with evAnalyze example
    Given I am on "https://demo.evinced.com"
    And I click on "HOUSE_DROPDOWN"
    And I click on "TENT_OPTION"
    And I click on "LOCATION_DROPDOWN"
    And I click on "CANADA_OPTION"
    And I run evAnalyze command
    And I click on "SEARCH_BUTTON"
    And I run evSaveFile command in "html" format and save it as "evAnalyzeReport"
    Then "SEARCH_RESULTS" should contain "Tent in Canada"

  Scenario: Test with evStart-evStop example
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
  Scenario: evStart-evStop example with hooks integration
    Given I am on "https://demo.evinced.com"
    And I click on "HOUSE_DROPDOWN"
    And I click on "TENT_OPTION"
    And I click on "LOCATION_DROPDOWN"
    And I click on "CANADA_OPTION"
    And I click on "SEARCH_BUTTON"
    Then "SEARCH_RESULTS" should contain "Tent in Canada"

  @evinced_hooks_integration @aggregated_report
  Scenario: evSaveFile example - aggregated report
    Given I am on "https://demo.evinced.com"
    And I click on "HOUSE_DROPDOWN"
    And I click on "TENT_OPTION"
    And I click on "LOCATION_DROPDOWN"
    And I click on "EAST_COAST_OPTION"
    And I click on "SEARCH_BUTTON"
    Then "SEARCH_RESULTS" should contain "Tent in East Coast"

  Scenario: Evinced configuration example
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
