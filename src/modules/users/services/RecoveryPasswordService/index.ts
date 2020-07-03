import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/appError';
import path from 'path';

interface Request {
  email: string;
}
@injectable()
class RecoveryPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists.');
    }
    const { token } = await this.usersTokenRepository.generate(user.id);
    const emailBaseUrl = process.env.APP_BASE_URL;
    const file = path.resolve(
      __dirname,
      '../../',
      'templates',
      'forgot_password.hbs',
    );
    await this.mailProvider.sendMail({
      to: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      },
      subject: '[Go Travel] Recuperação de senha',
      templateData: {
        file,
        variables: {
          name: `${user.firstName} ${user.lastName}`,
          link: `${emailBaseUrl}/reset_password?token=${token}`,
        },
      },
    });
  }
}
export default RecoveryPasswordService;
