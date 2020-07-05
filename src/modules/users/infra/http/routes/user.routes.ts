import { Router } from 'express';
import UsersController from '@modules/users/infra/http/controllers/usersController';
import { celebrate, Segments, Joi } from 'celebrate';

const userRouter = Router();
const usersController = new UsersController();

userRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      name: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default userRouter;
