import fs from 'fs';
import handlebars from 'handlebars';
import IMailTemplateProvidar from '../models/IMailTemplateProvider';
import ICreateMailTemplate from '../dtos/ICreateMailTemplate';

class HandlebarsMailTemplateProvider implements IMailTemplateProvidar {
  public async createTemplate({
    file,
    variables,
  }: ICreateMailTemplate): Promise<string> {
    const templateFileContetne = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseEmail = handlebars.compile(templateFileContetne);
    return parseEmail(variables);
  }
}

export default HandlebarsMailTemplateProvider;
