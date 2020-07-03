import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private mailClient: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.mailClient = transporter;
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const message = await this.mailClient.sendMail({
      from: {
        name: from?.name || 'Suporte GO Travel',
        address: from?.email || 'suport.gotravel@gmail.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.createTemplate(templateData),
    });
    // eslint-disable-next-line no-console
    console.log('Message sent: %s', message.messageId);
    // eslint-disable-next-line no-console
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
export default EtherealMailProvider;
