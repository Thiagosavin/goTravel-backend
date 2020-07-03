import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const userService = container.resolve(CreateUserService);
    const { user } = await userService.execute(req.body);
    return res.status(201).json({ user: classToClass(user) });
  }
}
