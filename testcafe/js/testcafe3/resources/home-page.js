import { Selector } from 'testcafe';

const FORM_SELECTOR = '#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container';
class HomePage {
  constructor () {
        this.searchButton    = Selector(`${FORM_SELECTOR} > a`);
        this.typeDropdown    = Selector(`${FORM_SELECTOR} > div:nth-child(1) > div > div.dropdown.line`);
        this.whereDropdown   = Selector(`${FORM_SELECTOR} > div:nth-child(2) > div > div.dropdown.line`);
        this.tinyHomeOption  = Selector(`${FORM_SELECTOR} > div:nth-child(1) > div > ul > li:nth-child(2)`);
        this.eastCoastOption = Selector(`${FORM_SELECTOR} > div:nth-child(2) > div > ul > li:nth-child(3)`);
    }
}

export default new HomePage();
