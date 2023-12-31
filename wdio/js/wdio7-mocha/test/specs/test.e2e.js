const {HomePage} = require('../pageobjects/home.page.js');
const {SecondPage} = require('../pageobjects/second.page.js');

let issues;

describe('Example test without Evinced', async () => {
  it('Should go to evinced demo site and perform actions', async () => {
    await browser.url('https://demo.evinced.com/');
    await HomePage.typeDropdown().click();
    await HomePage.tinyHomeOption().click();
    await HomePage.whereDropdown().click();
    await HomePage.eastCoastOption().click();
    await HomePage.btnSearch().click();
    await expect(SecondPage.pageHeader()).
        toHaveTextContaining('Results for: Tiny House in East Coast');
  });
});

describe('Test information', () => {
  it('Should print test version information', async () => {
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

    console.log(
        `\n=============================================\n` +
        `VM version: NodeJS ${process.version}\n` +
        `Framework version: WebdriverIO ${getPackageVersion('webdriverio')}\n` +
        `Test run date: ${TEST_RUN_TIME}\n` +
        `SDK version: WebdriverIO SDK ${getPackageVersion(
            '@evinced/webdriverio-sdk')}` +
        `\n=============================================\n`,
    );
  });
});

describe('Example tests with Evinced', async () => {
  it('Example of using evStart-evStop to assert no a11y issues are found',
      async () => {
        await browser.url('https://demo.evinced.com/');
        await browser.evStart();
        await HomePage.typeDropdown().click();
        await HomePage.tinyHomeOption().click();
        await HomePage.whereDropdown().click();
        await HomePage.eastCoastOption().click();
        await HomePage.btnSearch().click();

        issues = await browser.evStop();
        // This assertion will fail to demonstrate the a11y issues detection
        await expect(issues.length).toEqual(0);
      });

  it('Should save html report containing found a11y issues', async () => {
    await browser.url('https://demo.evinced.com/');
    await browser.evStart();
    await HomePage.typeDropdown().click();
    await HomePage.tinyHomeOption().click();
    await HomePage.whereDropdown().click();
    await HomePage.eastCoastOption().click();
    await HomePage.btnSearch().click();

    issues = await browser.evStop();
    await browser.evSaveFile(issues, 'html',
        `./reports/evReports/evSaveFileReport.html`);

    await expect(SecondPage.pageHeader()).
        toHaveTextContaining('Results for: Tiny House in East Coast');
  });

  it('Example of using evAnalyze and saving report containing a11y issues',
      async () => {
        await browser.url('https://demo.evinced.com/');
        issues = await browser.evAnalyze();
        await HomePage.typeDropdown().click();
        await HomePage.tinyHomeOption().click();
        await HomePage.whereDropdown().click();
        await HomePage.eastCoastOption().click();
        await HomePage.btnSearch().click();

        await browser.evSaveFile(issues, 'json',
            `./reports/evReports/evAnalyzeReport.json`);

        await expect(SecondPage.pageHeader()).
            toHaveTextContaining('Results for: Tiny House in East Coast');
      });

  it(
      'Example of changing the configuration of the SDK (adding root selector option)',
      async () => {
        await browser.url('https://demo.evinced.com/');

        await browser.evStart({
          rootSelector: '#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(1)',
        });
        await HomePage.typeDropdown().click();
        await HomePage.tinyHomeOption().click();
        await HomePage.whereDropdown().click();
        await HomePage.eastCoastOption().click();
        await HomePage.btnSearch().click();

        issues = await browser.evStop();
        await browser.evSaveFile(issues, 'html',
            `./reports/evReports/evConfigChangeReport.html`);

        await expect(SecondPage.pageHeader()).
            toHaveTextContaining('Results for: Tiny House in East Coast');
      });
});

describe('Example of using Evinced commands in before-after hooks', async () => {
  beforeEach(async () => {
    await browser.url('https://demo.evinced.com/');
    await browser.evStart();
  });

  it('Should go to evinced demo site and perform actions', async () => {
    await HomePage.typeDropdown().click();
    await HomePage.tinyHomeOption().click();
    await HomePage.whereDropdown().click();
    await HomePage.eastCoastOption().click();
    await HomePage.btnSearch().click();
    await expect(SecondPage.pageHeader()).toHaveTextContaining('Results for: Tiny House in East Coast');
  });

  afterEach(async () => {
    issues = await browser.evStop();
    await browser.evSaveFile(issues, 'html', `./reports/evReports/evBeforeAfterReport.html`);
  });
});
