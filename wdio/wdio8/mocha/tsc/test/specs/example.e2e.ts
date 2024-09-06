import { expect, browser, $ } from '@wdio/globals';

const FORM_SELECTOR = '#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container';
const BTN_SEARCH = `${FORM_SELECTOR} > a`;
const TYPE_DROPDOWN = `${FORM_SELECTOR} > div:nth-child(1) > div > div.dropdown.line`;
const WHERE_DROPDOWN = `${FORM_SELECTOR} > div:nth-child(2) > div > div.dropdown.line`;
const TINY_HOME_OPTION = `${FORM_SELECTOR} > div:nth-child(1) > div > ul > li:nth-child(2)`;
const EAST_COAST_OPTION = `${FORM_SELECTOR} > div:nth-child(2) > div > ul > li:nth-child(3)`;

describe('Example test with Evinced', async () => {
  it('Should go to evinced demo site and collect a11y issues using evAnalyze', async () => {
    await browser.url('https://demo.evinced.com/');

    const issues = await browser.evAnalyze();
    await browser.evSaveFile(issues, 'html', `./evWithEvincedReportUsingEvAnalyze.html`);
    await expect(issues.length).toEqual(0);
  });

  it('Should go to evinced demo site and perform actions and collect a11y issues using evStart/evStop', async () => {
    await browser.url('https://demo.evinced.com/');
    await browser.evStart();
    await $(TYPE_DROPDOWN).click();
    await $(TINY_HOME_OPTION).click();
    await $(WHERE_DROPDOWN).click();
    await $(EAST_COAST_OPTION).click();
    await $(BTN_SEARCH).click();
    const issues = await browser.evStop();
    await browser.evSaveFile(issues, 'html', `./evWithEvincedReportUsingEvStartStop.html`);
    await expect(issues.length).toEqual(0);
  });
});

