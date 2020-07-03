import mailConfig from '@config/mail';
import { inject, injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
class SesMailProvider implements IMailProvider {
  private mailClient: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.mailClient = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
      }),
    });
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from;

    await this.mailClient.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.createTemplate(templateData),
    });
  }
}
export default SesMailProvider;
