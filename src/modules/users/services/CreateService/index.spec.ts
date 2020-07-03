import AppError from '@shared/errors/appError';
import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/fakeHashProvider';

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
  it('should be able to create a new user', async () => {
    const result = await createUserService.execute({
      email: 'thiago@teste',
      firstName: 'Thiago',
      lastName: 'Savin',
      password: '1234',
    });

    expect(result.user.firstName).toBe('Thiago');
  });

  it('should not be able to create a user already registered ', async () => {
    await createUserService.execute({
      email: 'thiago@teste',
      firstName: 'Thiago',
      lastName: 'Savin',
      password: '1234',
    });
    await expect(
      createUserService.execute({
        email: 'thiago@teste',
        firstName: 'Thiago',
        lastName: 'Savin',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
