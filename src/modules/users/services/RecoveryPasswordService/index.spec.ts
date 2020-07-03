import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository';
import FakeUsersTokenRepository from '@modules/users/repositories/fakes/fakeUsersTokenRepository';
import RecoveryPasswordService from '@modules/users/services/RecoveryPasswordService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/fakeMailProvider';
import AppError from '@shared/errors/appError';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let recoveryPasswordService: RecoveryPasswordService;

describe('Send forgot password email', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUsersTokenRepository = new FakeUsersTokenRepository();
    recoveryPasswordService = new RecoveryPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUsersTokenRepository,
    );
  });
  it('should be able to recover the password using email', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      email: 'thiago@teste',
      firstName: 'Thiago',
      lastName: 'Savin',
      password: '1234',
    });
    await recoveryPasswordService.execute({
      email: 'thiago@teste',
    });

    expect(sendEmail).toHaveBeenCalled();
  });
  it('should not be able to recover the password with a invalid email', async () => {
    await expect(
      recoveryPasswordService.execute({
        email: 'thiago@teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should generate a user token in forgot password', async () => {
    const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      email: 'thiago@teste',
      firstName: 'Thiago',
      lastName: 'Savin',
      password: '1234',
    });
    await recoveryPasswordService.execute({
      email: 'thiago@teste',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
