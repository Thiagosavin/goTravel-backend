import { container } from 'tsyringe';
import './providers';
import '@modules/users/providers';
import UsersRepository from '@modules/users/infra/typeorm/repositories/usersRepository';
import UsersTokenRepository from '@modules/users/infra/typeorm/repositories/usersTokenRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUsersTokenRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/notificationsRepository';

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UsersTokenRepository',
  UsersTokenRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
