import { Router } from 'express';
import sessionRoutes from '@modules/users/infra/http/routes/sessions.routes';
import userRoutes from '@modules/users/infra/http/routes/user.routes';
import passwordRoutes from '@modules/users/infra/http/routes/password.routes';
import profileRoutes from '@modules/users/infra/http/routes/profile.routes';

const routes = Router('/api');

routes.use('/api/user', userRoutes);
routes.use('/api/sessions', sessionRoutes);
routes.use('/api/password', passwordRoutes);
routes.use('/api/profile', profileRoutes);
export default routes;
