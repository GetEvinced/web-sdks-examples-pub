import {EvincedSDK, setOfflineCredentials} from '@evinced/js-testcafe-sdk';
import homePage from './home-page';
import secondPage from './second-page';

let foundIssues = [];

fixture `Example test with use of Evinced SDK in before after hooks`
  .page `https://demo.evinced.com/`
  .before(async ctx => {
    setOfflineCredentials({
      serviceId: process.env.AUTH_SERVICE_ID,
      token: process.env.AUTH_TOKEN,
    })
  })
  .beforeEach(async t => {
    global.evinced = new EvincedSDK(t);
    await evinced.evStart();
  })
  .afterEach(async t => {
    foundIssues = await evinced.evStop();
    await evinced.evSaveFile(foundIssues, 'json', 'before-after-hook-evSaveFile.json');
});


test('Should see results for chosen options and record all accessibility issues found using evStart-evStop in before/after hooks', async t => {
  await evinced.evStart();

  await t
  .click(homePage.typeDropdown)
  .click(homePage.tinyHomeOption)
  .click(homePage.whereDropdown)
  .click(homePage.eastCoastOption)
  .click(homePage.searchButton)
  .expect(secondPage.pageHeader.innerText).match(/Results for: Tiny House in East Coast/);
});
