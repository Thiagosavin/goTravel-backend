import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import { container } from 'tsyringe';
import BcryptHashProvider from './HashProvider/implementations/BcryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
