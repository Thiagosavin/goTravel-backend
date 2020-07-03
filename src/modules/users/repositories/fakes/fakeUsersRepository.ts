import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/users';
import { uuid } from 'uuidv4';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(users => users.email === email);
    return findUser;
  }

  public async create({
    email,
    firstName,
    lastName,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      email,
      firstName,
      lastName,
      password,
      createAt: new Date(Date.now()),
      updateAt: new Date(Date.now()),
    });
    this.users.push(user);
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(users => users.id === id);
    return findUser;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }
}
export default FakeUserRepository;
