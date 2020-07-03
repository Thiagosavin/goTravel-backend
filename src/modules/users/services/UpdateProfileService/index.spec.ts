import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository';
import UpdateUserService from '@modules/users/services/UpdateProfileService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/fakeHashProvider';
import AppError from '@shared/errors/appError';

let fakeUsersRepository: FakeUsersRepository;
let updateService: UpdateUserService;
let fakeHashProvider: FakeHashProvider;

describe('Send forgot password email', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateService = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update data', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste.com',
      firstName: 'teste',
      lastName: 'sobrenome',
      password: '12345',
    });
    const updatedUser = await updateService.execute({
      userId: user.id,
      email: 'testetrocado.com',
      firstName: 'teste',
      lastName: 'sobrenome',
    });
    expect(updatedUser.email).toBe('testetrocado.com');
  });
  it('should not be able to update with an exists email', async () => {
    await fakeUsersRepository.create({
      email: 'teste.com.br',
      firstName: 'teste',
      lastName: 'sobrenome',
      password: '12345',
    });

    const user = await fakeUsersRepository.create({
      email: 'teste.com',
      firstName: 'teste',
      lastName: 'sobrenome',
      password: '12345',
    });

    await expect(
      updateService.execute({
        userId: user.id,
        email: 'teste.com.br',
        firstName: 'TesteTrocado',
        lastName: 'Sobrenome',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste.com',
      firstName: 'teste',
      lastName: 'sobrenome',
      password: '12345',
    });
    const updatedUser = await updateService.execute({
      userId: user.id,
      email: 'teste.com',
      firstName: 'teste',
      lastName: 'sobrenome',
      password: '123415',
      oldPassword: '12345',
    });
    expect(updatedUser.password).toBe('123415');
  });
  it('should not be able to update the password with an invalid user', async () => {
    await fakeUsersRepository.create({
      email: 'teste.com',
      firstName: 'teste',
      lastName: 'sobrenome',
      password: '12345',
    });
    await expect(
      updateService.execute({
        userId: '123',
        email: 'emailteste',
        firstName: 'teste',
        lastName: 'sobrenome',
        password: '123415',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with no old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste.com',
      firstName: 'teste',
      lastName: 'sobrenome',
      password: '12345',
    });
    await expect(
      updateService.execute({
        userId: user.id,
        email: 'teste.com',
        firstName: 'teste',
        lastName: 'sobrenome',
        password: '123415',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with incorrect old password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste.com',
      firstName: 'teste',
      lastName: 'sobrenome',
      password: '12345',
    });
    await expect(
      updateService.execute({
        userId: user.id,
        email: 'teste.com',
        firstName: 'teste',
        lastName: 'sobrenome',
        password: '123415',
        oldPassword: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
