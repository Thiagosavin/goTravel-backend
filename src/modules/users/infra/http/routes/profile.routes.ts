import { Router } from 'express';
import authMiddelware from '@modules/users/infra/middlewares/authenticate';
import ProfileController from '@modules/users/infra/http/controllers/profileController';
import { celebrate, Segments, Joi } from 'celebrate';

const profileRouter = Router();
const profileController = new ProfileController();
profileRouter.use(authMiddelware);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string(),
      oldPassword: Joi.string(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    },
  }),
  profileController.update,
);
profileRouter.get('/', profileController.show);

export default profileRouter;
