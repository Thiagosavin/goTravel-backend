import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SessionsController from '../controllers/sessionsController';

const sessionsRouter = Router();

const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRouter;
