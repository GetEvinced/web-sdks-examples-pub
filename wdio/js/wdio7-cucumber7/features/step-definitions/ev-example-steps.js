import {Given, When, Then} from '@wdio/cucumber-framework';
import {Before, After} from '@wdio/cucumber-framework';
import CommonPage from '../pageobjects/common.page.js';
import HomePage from '../pageobjects/home.page.js';
import SecondPage from '../pageobjects/second.page.js';
import CucumberJsJsonReporter from 'wdio-cucumberjs-json-reporter';

let issues = '';

Given(/^I print the versions information$/, async function() {
  const TEST_RUN_TIME = new Date().toLocaleString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  const getPackageVersion = (PACKAGE_NAME) => {
    try {
      const file = '../../node_modules/' + PACKAGE_NAME + '/package.json';
      const json = require(file);
      return json.version;
    } catch (err) {
      console.log('Package not found: ' + err);
    }
  };

  CucumberJsJsonReporter.attach(
      `VM version: NodeJS ${process.version}\n` +
    `Framework version: WebdriverIO ${getPackageVersion('webdriverio')}\n` +
    `Test run date: ${TEST_RUN_TIME}\n` +
    `SDK version: WebdriverIO SDK ${getPackageVersion('@evinced/webdriverio-sdk')}\n`, 'text/plain',
  );
});

Given(/^I set global root selector to "([^"]*)"$/, async function(selector) {
  browser.evincedOptions.rootSelector = selector;
});

When(/^I run evStart$/, async () => {
  await browser.evStart();
});

When(/^I run evStop$/, async () => {
  issues = await browser.evStop();
});

When(/^I run evAnalyze$/, async () => {
  issues = await browser.evAnalyze();
});

When(/^I run evSaveFile with name "([^"]*)" and type "([^"]*)"$/, async (name, type) => {
  await browser.evSaveFile(issues, type, `./reports/evReports/${name}.${type}`);
});

Then(/^There should be no accessibility issues on the site$/, async () => {
  await expect(issues.length).toEqual(0);
});

Given(/^I am on evinced demo site$/, async () => {
  await CommonPage.openHomePage();
  await HomePage.typeDropdown().waitForExist({timeout: 50000});
});

When(/^I click "([^"]*)"$/, async (button) => {
  switch (button) {
    case 'SearchButton':
      await HomePage.btnSearch().click();
      break;
    case 'TypeDropdown':
      await HomePage.typeDropdown().click();
      break;
    case 'LocationDropdown':
      await HomePage.whereDropdown().click();
      break;
  }
});

When(/^I select "([^"]*)"$/, async (option) => {
  switch (option) {
    case 'TinyHome':
      await HomePage.tinyHomeOption().click();
      break;
    case 'EastCoast':
      await HomePage.eastCoastOption().click();
      break;
  }
});

Then(/^I should see new page with results$/, async () => {
  await expect(SecondPage.pageHeader()).toHaveTextContaining('Results for: Tiny House in East Coast');
});

Before({tags: '@before-after'}, async () => {
  await browser.evStart();
});

After({tags: '@before-after'}, async () => {
  issues = await browser.evStop();
  await browser.evSaveFile(issues, 'html', `./reports/evReports/before-after-report.html`);
});
