import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '@modules/users/infra/typeorm/entities/users';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/appError';

interface Request {
  id: string;
}
@injectable()
class ShowUserProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: Request): Promise<User> {
    let user = await this.cacheProvider.recover<User>(`user_id:${id}`);
    if (!user) {
      user = await this.userRepository.findById(id);
      if (!user) {
        throw new AppError('User not found.');
      }
      await this.cacheProvider.save(`user_id:${id}`, user);
    }
    return user;
  }
}
export default ShowUserProfileService;
