import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/appError';
import User from '@modules/users/infra/typeorm/entities/users';

interface Request {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  oldPassword?: string;
}
@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    userId,
    email,
    firstName,
    lastName,
    password,
    oldPassword,
  }: Request): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('User does not exists.');
    }
    const userWithEmail = await this.userRepository.findByEmail(email);
    if (userWithEmail && userWithEmail.id !== userId) {
      throw new AppError('E-mail already registered');
    }
    if (password) {
      if (!oldPassword) {
        throw new AppError('The old password is required');
      }
      const comparePassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );
      if (!comparePassword) {
        throw new AppError('Incorrect old password');
      }
      const newPassword = await this.hashProvider.generatedHash(password);
      user.password = newPassword;
    }

    user.email = email;
    user.lastName = lastName;
    user.firstName = firstName;
    await this.userRepository.save(user);

    return user;
  }
}
export default UpdateUserService;
