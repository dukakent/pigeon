import { PigeonPage } from './app.po';

describe('pigeon App', function() {
  let page: PigeonPage;

  beforeEach(() => {
    page = new PigeonPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
