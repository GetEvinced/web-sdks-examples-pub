import {EvincedSDK, setOfflineCredentials} from '@evinced/js-testcafe-sdk';
import homePage from './home-page';
import secondPage from './second-page';

fixture `Example test with use of Evinced SDK`
  .page `https://demo.evinced.com/`
  .before(async ctx => {
    setOfflineCredentials({
      serviceId: process.env.AUTH_SERVICE_ID,
      token: process.env.AUTH_TOKEN,
    })
  })
  .beforeEach(async t => {
    global.evinced = new EvincedSDK(t);
});


test('Should see results for chosen options and record all accessibility issues found using evStart-evStop', async t => {
  await evinced.evStart();

  await t
  .click(homePage.typeDropdown)
  .click(homePage.tinyHomeOption)
  .click(homePage.whereDropdown)
  .click(homePage.eastCoastOption)
  .click(homePage.searchButton)
  .expect(secondPage.pageHeader.innerText).match(/Results for: Tiny House in East Coast/);

  const foundIssues = await evinced.evStop();

  // This assertion is intended to fail to demonstrate how to assert accessibility issues
  await t.expect(foundIssues.length).eql(0);
});

test('Should see results for chosen options and record all accessibility issues found using evAnalyze', async t => {
  await t
  .click(homePage.typeDropdown)
  .click(homePage.tinyHomeOption)
  .click(homePage.whereDropdown)
  .click(homePage.eastCoastOption)
  .click(homePage.searchButton)
  .expect(secondPage.pageHeader.innerText).match(/Results for: Tiny House in East Coast/);

  const foundIssues = await evinced.evAnalyze();

  await evinced.evSaveFile(foundIssues, 'json', 'evAnalyzeReport.json');
});

test('Should see results for chosen options and record all accessibility issues found using evStart-evStop and save html report', async t => {
  await evinced.evStart();

  await t
  .click(homePage.typeDropdown)
  .click(homePage.tinyHomeOption)
  .click(homePage.whereDropdown)
  .click(homePage.eastCoastOption)
  .click(homePage.searchButton)
  .expect(secondPage.pageHeader.innerText).match(/Results for: Tiny House in East Coast/);

  const foundIssues = await evinced.evStop();

  await evinced.evSaveFile(foundIssues, 'html', 'evSaveFileReport.html');
});

test('Should see results for chosen options and record accessibility issues found only in scope of specified root selector', async t => {
  await evinced.evStart({ rootSelector: '#gatsby-focus-wrapper > main > div.wrapper-banner ' });

  await t
    .click(homePage.typeDropdown)
    .click(homePage.tinyHomeOption)
    .click(homePage.whereDropdown)
    .click(homePage.eastCoastOption)
    .click(homePage.searchButton)
    .expect(secondPage.pageHeader.innerText).match(/Results for: Tiny House in East Coast/);

  const foundIssues = await evinced.evStop();

  await evinced.evSaveFile(foundIssues, 'html', 'evConfigChangeReport.html');
});
