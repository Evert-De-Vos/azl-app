import { AzlAppFrontendPage } from './app.po';

describe('azl-app-frontend App', function() {
  let page: AzlAppFrontendPage;

  beforeEach(() => {
    page = new AzlAppFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
