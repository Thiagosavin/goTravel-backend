import ICreateMailTemplate from '../dtos/ICreateMailTemplate';

export default interface IMailTemplateProvider {
  createTemplate(data: ICreateMailTemplate): Promise<string>;
}
