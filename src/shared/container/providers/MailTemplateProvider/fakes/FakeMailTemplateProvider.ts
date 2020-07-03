import IMailTemplateProvidar from '../models/IMailTemplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvidar {
  public async createTemplate(): Promise<string> {
    return 'Email Fake';
  }
}

export default FakeMailTemplateProvider;
