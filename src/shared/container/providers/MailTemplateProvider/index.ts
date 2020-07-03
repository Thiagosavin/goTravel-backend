import { container } from 'tsyringe';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import HandlesbarsMailProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandlesbarsMailProvider,
};

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
