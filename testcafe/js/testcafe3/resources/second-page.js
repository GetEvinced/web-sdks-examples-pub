import { Selector } from 'testcafe';

const FORM_SELECTOR = '#gatsby-focus-wrapper > main';

class SecondPage {
    constructor () {
        this.pageHeader = Selector(`${FORM_SELECTOR} > h1`);
    }
}

export default new SecondPage();
