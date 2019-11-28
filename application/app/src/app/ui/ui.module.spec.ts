import { UIModule } from './ui.module';

describe('UIModule', () => {
  let uIModule: UIModule;

  beforeEach(() => {
    uIModule = new UIModule();
  });

  it('should create an instance', () => {
    expect(uIModule).toBeTruthy();
  });
});
