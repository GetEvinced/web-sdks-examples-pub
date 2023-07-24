const FORM_SELECTOR = '#gatsby-focus-wrapper > main';

class SecondPage {
  pageHeader() {
    return $(`${FORM_SELECTOR} > h1`);
  }
}

export default new SecondPage();
