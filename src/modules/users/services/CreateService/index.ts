import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/appError';
import User from '@modules/users/infra/typeorm/entities/users';
import { injectable, inject } from 'tsyringe';

interface Request {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
interface Response {
  user: User;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
    @inject('HashProvider')
    private iHashProviderRepository: IHashProvider,
  ) {}

  public async execute({
    email,
    firstName,
    lastName,
    password,
  }: Request): Promise<Response> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError('User already registered.');
    }
    const hashPassword = await this.iHashProviderRepository.generatedHash(
      password,
    );
    const user = await this.userRepository.create({
      email,
      firstName,
      lastName,
      password: hashPassword,
    });

    return { user };
  }
}
export default CreateUserService;
