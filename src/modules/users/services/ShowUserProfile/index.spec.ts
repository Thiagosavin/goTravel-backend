import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/fakeCacheProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository';
import ShowUserProfileService from '@modules/users/services/ShowUserProfile';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/fakeHashProvider';
import AppError from '@shared/errors/appError';
import CreateUserService from '../CreateService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('Create User Services Tests', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able find user by id', async () => {
    const { user } = await createUserService.execute({
      email: 'thiago@teste',
      firstName: 'Thiago',
      lastName: 'Savin',
      password: '1234',
    });
    const { id } = user;

    const showUserService = new ShowUserProfileService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
    const profile = await showUserService.execute({ id });

    expect(profile.email).toBe('thiago@teste');
    expect(profile.firstName).toBe('Thiago');
  });
  it('should not be able find user by incorret id', async () => {
    await createUserService.execute({
      email: 'thiago@teste',
      firstName: 'Thiago',
      lastName: 'Savin',
      password: '1234',
    });

    const showUserService = new ShowUserProfileService(
      fakeUsersRepository,
      fakeCacheProvider,
    );

    await expect(
      showUserService.execute({ id: '1234' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
