import UserToken from '../infra/typeorm/entities/usersToken';

export default interface IUsersTokenRepository {
  generate(userId: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
