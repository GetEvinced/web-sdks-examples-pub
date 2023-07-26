Feature: Example of evinced SDK

    Scenario: Test versions information
        Given I print the versions information

    Scenario: Example without Evinced SDK - As a user I want to choose the stay and see proper results
        Given I am on evinced demo site
        When I click "TypeDropdown"
        And I select "TinyHome"
        And I click "LocationDropdown"
        And I select "EastCoast"
        And I click "SearchButton"
        Then I should see new page with results

    Scenario: Example with evStart-evStop - As a user I want to record all accessibility issues during my interaction with page
        Given I am on evinced demo site
        When I run evStart
        And I click "TypeDropdown"
        And I select "TinyHome"
        And I click "LocationDropdown"
        And I select "EastCoast"
        And I click "SearchButton"
        And I run evStop
        # This step is intended to fail to demonstrate how to assert accessibility issues
        Then There should be no accessibility issues on the site

    Scenario: Example with evStart-evStop and evSaveFile - As a user I want to record all occuring acessibility issues and save them as html report
        Given I am on evinced demo site
        When I run evStart
        And I click "TypeDropdown"
        And I select "TinyHome"
        And I click "LocationDropdown"
        And I select "EastCoast"
        And I click "SearchButton"
        And I run evStop
        And I run evSaveFile with name "evSaveFileReport" and type "html"
        Then I should see new page with results

    Scenario: Example with different configuration - As a user I want to record all issues occuring in a given root selector
        Given I am on evinced demo site
        When I run evStart and set global root selector to "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(1)"
        And I click "TypeDropdown"
        And I select "TinyHome"
        And I click "LocationDropdown"
        And I select "EastCoast"
        And I click "SearchButton"
        And I run evStop
        And I run evSaveFile with name "evConfigChangeReport" and type "html"
        Then I should see new page with results

    @before-after
    Scenario: Example with before-after hooks - As a user I want to record all accessibility issues and save the report
        Given I am on evinced demo site
        When I click "TypeDropdown"
        And I select "TinyHome"
        And I click "LocationDropdown"
        And I select "EastCoast"
        And I click "SearchButton"
        Then I should see new page with results

    Scenario: Example with evAnalyze - I want to snapshot all issues on home page with evAnalyze and save report as json
        Given I am on evinced demo site
        When I run evAnalyze
        And I click "TypeDropdown"
        And I select "TinyHome"
        And I click "LocationDropdown"
        And I select "EastCoast"
        And I click "SearchButton"
        And I run evSaveFile with name "evAnalyzeReport" and type "json"
        Then I should see new page with results
