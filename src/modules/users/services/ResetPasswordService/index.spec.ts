import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository';
import FakeUsersTokenRepository from '@modules/users/repositories/fakes/fakeUsersTokenRepository';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/fakeHashProvider';
import AppError from '@shared/errors/appError';
import FakeNotificationsFepository from '@modules/notifications/repositories/fakes/fakeNotificationsRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;
let fakeNotificationsRepository: FakeNotificationsFepository;

describe('Reset password service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeNotificationsRepository = new FakeNotificationsFepository();
    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeUsersTokenRepository,
      fakeNotificationsRepository,
    );
  });
  it('should be able to reset the password', async () => {
    let user = await fakeUsersRepository.create({
      email: 'teste.com',
      firstName: 'teste',
      lastName: 'sobrenome',
      password: '12345',
    });
    const { token } = await fakeUsersTokenRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generatedHash');

    await resetPasswordService.execute({ password: '123123', token });

    user = await fakeUsersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(user?.password).toEqual('123123');
  });
  it('should not be able to reset the password with invalid token', async () => {
    await expect(
      resetPasswordService.execute({
        token: '123',
        password: '512334',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset the password with invalid user', async () => {
    const { token } = await fakeUsersTokenRepository.generate('123');
    await expect(
      resetPasswordService.execute({
        token,
        password: '512334',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with past 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      email: 'teste.com',
      firstName: 'teste',
      lastName: 'sobrenome',
      password: '12345',
    });
    const { token } = await fakeUsersTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        token,
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
