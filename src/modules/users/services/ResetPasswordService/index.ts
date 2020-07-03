import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/appError';
import { differenceInHours, format } from 'date-fns';

interface Request {
  password: string;
  token: string;
}
@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute({ token, password }: Request): Promise<void> {
    const userToken = await this.usersTokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User token does not exists.');
    }
    const user = await this.userRepository.findById(userToken.userId);
    if (!user) {
      throw new AppError('User does not exists.');
    }
    const diffDateHours = differenceInHours(Date.now(), userToken.createAt);
    if (diffDateHours > 2) {
      throw new AppError('Time exceeded.');
    }
    user.password = await this.hashProvider.generatedHash(password);
    const formatttedDate = format(user.updateAt, "dd/MM/yyyy 'às' HH:mm");
    await this.userRepository.save(user);
    await this.notificationsRepository.create({
      userId: user.id,
      content: `Nova senha criada para o email: ${user.email} em: ${formatttedDate}`,
    });
  }
}
export default ResetPasswordService;
