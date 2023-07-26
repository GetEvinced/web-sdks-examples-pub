import {Before, After, Given, When, Then} from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../../pages/components/home.page';
import SecondPage from '../../pages/components/second.page';
import addContext from 'mochawesome/addContext';

let issues: Issue[];

Given(/^I print the versions information$/, () => {
  const json = require('@evinced/cypress-sdk/package.json');
  let nodeVersion: string;

  cy.task('getNodeVersion').then((version: string) => {
    nodeVersion = version;
  });

  const TEST_RUN_TIME = new Date().toLocaleString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
  cy.visit('https://demo.evinced.com/');
  cy.evAnalyze();
  Cypress.on('test:after:run', (test) => {
    addContext({test},
        (`Test information \n` +
      `VM version: NodeJS ${nodeVersion}\n` +
      `Framework version: Cypress ${Cypress.version}\n` +
      `Test run date: ${TEST_RUN_TIME}\n` +
      `SDK version: Cypress SDK ${json.version}\n`));
  });
});

When(/^I run evStart and set global root selector to "([^"]*)"$/, (rootSelector: string) => {
  cy.evStart({rootSelector: rootSelector});
});

Given(/^I am on evinced demo site$/, () => {
  cy.visit('https://demo.evinced.com/');
});

When(/^I click "([^"]*)"$/, (button: string) => {
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

When(/^I select "([^"]*)"$/, (option: string) => {
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
  cy.evStop().then((report: Issue[]) => {
    issues = report;
  });
});

When(/^I run evAnalyze$/, async () => {
  cy.evAnalyze().then((report: Issue[]) => {
    issues = report;
  });
});

Then(/^I should see new page with results$/, () => {
  SecondPage.pageHeader().contains('Results for: Tiny House in East Coast');
});

Then(/^There should be no accessibility issues on the site$/, () => {
  expect(issues.length).to.eql(0);
});

When(/^I run evSaveFile with name "([^"]*)" and type "([^"]*)"$/, (name: string, type: SaveFileFormat) => {
  cy.evSaveFile(issues, type, `./reports/evReports/${name}.${type}`);
});

Before({tags: '@before-after'}, () => {
  cy.evStart();
});

After({tags: '@before-after'}, () => {
  cy.evStop().then((report: Issue[]) => {
    cy.evSaveFile(report, 'html', `./reports/evReports/repHooks.html`);
  });
});
