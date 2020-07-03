import IUserTokensRepository from '@modules/users/repositories/IUsersTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/usersToken';
import { uuid } from 'uuidv4';

class FakeUserRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(userId: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      userId,
      createAt: new Date(),
      updateAt: new Date(),
    });
    this.userTokens.push(userToken);
    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(list => list.token === token);

    return userToken;
  }
}
export default FakeUserRepository;
