import { getRepository, Repository } from 'typeorm';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UsersToken from '@modules/users/infra/typeorm/entities/usersToken';

class UsersTokenRepository implements IUsersTokenRepository {
  private ormRepository: Repository<UsersToken>;

  constructor() {
    this.ormRepository = getRepository(UsersToken);
  }

  public async generate(userId: string): Promise<UsersToken> {
    const userToken = this.ormRepository.create({
      userId,
    });
    await this.ormRepository.save(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UsersToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });
    return userToken;
  }
}
export default UsersTokenRepository;
