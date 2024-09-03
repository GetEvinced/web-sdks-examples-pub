import homePage from './home-page';
import secondPage from './second-page';

fixture `Example test without using Evinced SDK`
    .page `https://demo.evinced.com/`;

test('Should see results for chosen options', async t => {
    await t
        .click(homePage.typeDropdown)
        .click(homePage.tinyHomeOption)
        .click(homePage.whereDropdown)
        .click(homePage.eastCoastOption)
        .click(homePage.searchButton)
        .expect(secondPage.pageHeader.innerText).match(/Results for: Tiny House in East Coast/);
});
