import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/appError';
import User from '@modules/users/infra/typeorm/entities/users';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import jwtConfig from '@config/jwtConfig';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private iHashProviderRepository: IHashProvider,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid Username/Password', 401);
    }
    const isValid = await this.iHashProviderRepository.compareHash(
      password,
      user.password,
    );

    if (!isValid) {
      throw new AppError('Invalid Username/Password', 401);
    }
    const token = sign({}, jwtConfig.JWT.TOKEN, {
      subject: user.id,
      expiresIn: jwtConfig.JWT.EXPIRE,
    });

    return { user, token };
  }
}
export default AuthenticateUserService;
