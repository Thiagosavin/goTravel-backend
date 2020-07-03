import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import PasswordController from '../controllers/passwordController';

const passwordRoutes = Router();

const passworController = new PasswordController();

passwordRoutes.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
    },
  }),
  passworController.create,
);

passwordRoutes.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  passworController.update,
);

export default passwordRoutes;
