import {test, expect, Page} from '@playwright/test';
import HomePage from '../pages/home.page';
import SecondPage from '../pages/second.page';
import {setupEvinced, getPackageVersion} from '../support/test-setup.js';
import {EvincedSDK, Issue} from '@evinced/js-playwright-sdk';

test.describe('Examples of Evinced SDK usage', () => {
  let issues: Issue[];
  let page: Page;
  let evincedService: EvincedSDK;

  test.beforeAll(async () => {
    await setupEvinced();
    page = await globalThis.browser.newPage();
    evincedService = new EvincedSDK(page);
  });

  test.beforeEach(async ({}, testInfo) => {
    if (String(testInfo) === 'Example with before-after hooks - As a user I want to ' +
    'record all accessibility issues and save the report') {
      await evincedService.evStart();
    }
  });

  test('Test versions information', async () => {
    test.info().annotations.push({
      type: 'Test informations: ',
      description: `VM version: NodeJS ${process.version} /// ` +
      `Framework version: Playwright ${getPackageVersion('playwright')} /// ` +
                   `Test run date: ${globalThis.TEST_RUN_TIME} /// ` +
                   `SDK version: Playwright SDK ${getPackageVersion('@evinced/js-playwright-sdk')}`,
    });
  });

  test('Example without Evinced', async () => {
    await page.goto('https://demo.evinced.com/');
    await HomePage.typeDropdown(page).click();
    await HomePage.tinyHomeOption(page).click();
    await HomePage.whereDropdown(page).click();
    await HomePage.eastCoastOption(page).click();
    await HomePage.btnSearch(page).click();
    await expect(SecondPage.pageHeader(page)).toContainText('Results for: Tiny House in East Coast');
  });

  test('Example with evStart-evStop - As a user I want to ' +
  'record all accessibility issues during my interaction with page', async () => {
    await evincedService.evStart();
    await page.goto('https://demo.evinced.com/');

    await HomePage.typeDropdown(page).click();
    await HomePage.tinyHomeOption(page).click();
    await HomePage.whereDropdown(page).click();
    await HomePage.eastCoastOption(page).click();
    await HomePage.btnSearch(page).click();

    issues = await evincedService.evStop();
    await expect(SecondPage.pageHeader(page)).toContainText('Results for: Tiny House in East Coast');

    // This step is inteded to fail to show how to assert a11y issues
    expect(issues.length).toEqual(0);
  });

  test('Example with evStart-evStop and evSaveFile - As a user I want to ' +
  'record all occuring acessibility issues and save them as html report', async () => {
    await evincedService.evStart();
    await page.goto('https://demo.evinced.com/');

    await HomePage.typeDropdown(page).click();
    await HomePage.tinyHomeOption(page).click();
    await HomePage.whereDropdown(page).click();
    await HomePage.eastCoastOption(page).click();
    await HomePage.btnSearch(page).click();

    issues = await evincedService.evStop();
    await expect(SecondPage.pageHeader(page)).toContainText('Results for: Tiny House in East Coast');

    await evincedService.evSaveFile(issues, 'html', `./reports/evReports/evSaveFileReport.html`);
  });

  test('Example with different configuration - As a user I want to ' +
  'record all issues occuring in a given root selector', async () => {
    await evincedService.evStart({rootSelector: '#gatsby-focus-wrapper > main > div.wrapper-banner' +
     '> div.filter-container > div:nth-child(1)'});

    await page.goto('https://demo.evinced.com/');
    await HomePage.typeDropdown(page).click();
    await HomePage.tinyHomeOption(page).click();
    await HomePage.whereDropdown(page).click();
    await HomePage.eastCoastOption(page).click();
    await HomePage.btnSearch(page).click();

    issues = await evincedService.evStop();
    await expect(SecondPage.pageHeader(page)).toContainText('Results for: Tiny House in East Coast');

    await evincedService.evSaveFile(issues, 'html', './reports/evReports/evConfigChangeReport.html');
  });

  test('Example with before-after hooks - As a user I want to ' +
  'record all accessibility issues and save the report', async () => {
    await page.goto('https://demo.evinced.com/');
    await HomePage.typeDropdown(page).click();
    await HomePage.tinyHomeOption(page).click();
    await HomePage.whereDropdown(page).click();
    await HomePage.eastCoastOption(page).click();
    await HomePage.btnSearch(page).click();

    await expect(SecondPage.pageHeader(page)).toContainText('Results for: Tiny House in East Coast');
  });

  test('Example with evAnalyze - I want to ' +
  'snapshot all issues on home page with evAnalyze and save report as json', async () => {
    await page.goto('https://demo.evinced.com/');
    issues = await evincedService.evAnalyze();

    await HomePage.typeDropdown(page).click();
    await HomePage.tinyHomeOption(page).click();
    await HomePage.whereDropdown(page).click();
    await HomePage.eastCoastOption(page).click();
    await HomePage.btnSearch(page).click();
    await expect(SecondPage.pageHeader(page)).toContainText('Results for: Tiny House in East Coast');

    await evincedService.evSaveFile(issues, 'json', `./reports/evReports/evAnalyzeReport.json`);
  });

  test.afterEach(async ({}, testInfo) => {
    if (String(testInfo) === 'Example with before-after hooks - As a user I want to ' +
    'record all accessibility issues and save the report') {
      issues = await evincedService.evStop();
    }
  });
});
