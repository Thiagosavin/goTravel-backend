import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/fakeHashProvider';
import AuthenticateUserService from '@modules/users/services/AuthenticateService';
import CreateUserService from '@modules/users/services/CreateService';
import AppError from '@shared/errors/appError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
describe('Create User Services Tests', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    await createUserService.execute({
      email: 'thiagosavin2@hotmail.com',
      firstName: 'Thiago',
      lastName: 'Costa Soares',
      password: '123456',
    });

    const result = await authenticateUserService.execute({
      email: 'thiagosavin2@hotmail.com',
      password: '123456',
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate with invalid user ', async () => {
    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    await createUserService.execute({
      email: 'thiagosavin2@hotmail.com',
      firstName: 'Thiago',
      lastName: 'Costa Soares',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'thiagosavin@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with invalid password ', async () => {
    const authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    await createUserService.execute({
      email: 'thiagosavin2@hotmail.com',
      firstName: 'Thiago',
      lastName: 'Costa Soares',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'thiagosavin2@hotmail.com',
        password: '1',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
