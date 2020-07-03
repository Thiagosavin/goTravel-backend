import ICreateMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/ICreateMailTemplate';

interface MailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: MailContact;
  from?: MailContact;
  subject: string;
  templateData: ICreateMailTemplateDTO;
}
