import {Before, After, Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../../pages/components/home.page';
import SecondPage from '../../pages/components/second.page';

let issues = '';

Given(/^I print the versions information$/, () => {
  const json = require('@evinced/cypress-sdk/package.json');

  cy.task('getNodeVersion').then((nodeVersion) => {
    cy.NODE_VERSION = nodeVersion;
  });

  cy.test_run_time = new Date().toLocaleString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  cy.visit('https://demo.evinced.com/');
  cy.evAnalyze();
  cy.window().then(() => {
    cy.addTestContext('Test information \n' +
      `VM version: NodeJS ${cy.NODE_VERSION}\n` +
      `Framework version: Cypress ${Cypress.version}\n` +
      `Test run date: ${cy.test_run_time}\n` +
      `SDK version: Cypress SDK ${json.version}\n`);
  });
});

When(/^I run evStart and set global root selector to "([^"]*)"$/, (rootSelector) => {
  cy.evStart({rootSelector: rootSelector});
});

Given(/^I am on evinced demo site$/, () => {
  cy.visit('https://demo.evinced.com/');
});

When(/^I click "([^"]*)"$/, (button) => {
  switch (button) {
    case 'SearchButton':
      HomePage.btnSearch().click();
      break;
    case 'TypeDropdown':
      HomePage.typeDropdown().click();
      break;
    case 'LocationDropdown':
      HomePage.whereDropdown().click();
      break;
  }
});

When(/^I select "([^"]*)"$/, (option) => {
  switch (option) {
    case 'TinyHome':
      HomePage.tinyHomeOption().click();
      break;
    case 'EastCoast':
      HomePage.eastCoastOption().click();
      break;
  }
});

When(/^I run evStart$/, () => {
  cy.evStart();
});

When(/^I run evStop$/, () => {
  cy.evStop().then((report) => {
    issues = report;
  });
});

When(/^I run evAnalyze$/, async () => {
  cy.evAnalyze().then((report) => {
    issues = report;
  });
});

Then(/^I should see new page with results$/, () => {
  SecondPage.pageHeader().contains('Results for: Tiny House in East Coast');
});

Then(/^There should be no accessibility issues on the site$/, () => {
  expect(issues.length).to.eql(0);
});

When(/^I run evSaveFile with name "([^"]*)" and type "([^"]*)"$/, (name, type) => {
  cy.evSaveFile(issues, type, `./reports/evReports/${name}.${type}`);
});

Before({tags: '@before-after'}, () => {
  cy.evStart();
});

After({tags: '@before-after'}, () => {
  cy.evStop().then((report) => {
    cy.evSaveFile(report, 'html', `./reports/evReports/repHooks.html`);
  });
});
