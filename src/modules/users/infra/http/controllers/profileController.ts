import { classToClass } from 'class-transformer';
import ShowUserProfileService from '@modules/users/services/ShowUserProfile';
import UpdateUserService from '@modules/users/services/UpdateProfileService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showUserService = container.resolve(ShowUserProfileService);
    const { id } = req.user;
    const user = await showUserService.execute({ id });
    // TODO: VERIFICAR POR QUE RETORNA O PASSWORD MESMO COM O CLASSTOCLASS
    delete user.password;
    return res.json({ user: classToClass(user) });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { email, password, lastName, firstName, oldPassword } = req.body;
    const { id } = req.user;

    const updateUserService = container.resolve(UpdateUserService);
    const user = await updateUserService.execute({
      userId: id,
      email,
      password,
      lastName,
      firstName,
      oldPassword,
    });
    return res.json({ user: classToClass(user) });
  }
}
