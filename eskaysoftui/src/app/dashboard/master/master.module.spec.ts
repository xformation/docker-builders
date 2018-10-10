import { MasterModule } from './master.module';

describe('MasterModule', () => {
  let masterModule: MasterModule;

  beforeEach(() => {
    masterModule = new MasterModule();
  });

  it('should create an instance', () => {
    expect(masterModule).toBeTruthy();
  });
});
