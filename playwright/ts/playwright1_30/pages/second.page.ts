const FORM_SELECTOR = '#gatsby-focus-wrapper > main';

class SecondPage {
  pageHeader = (page) => page.locator(`${FORM_SELECTOR} > h1`);
}

export default new SecondPage();
