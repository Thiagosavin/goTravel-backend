import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import RecoveryPasswordService from '@modules/users/services/RecoveryPasswordService';

export default class passwordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const recoveryPasswordService = container.resolve(RecoveryPasswordService);
    await recoveryPasswordService.execute({
      email,
    });
    return res.status(204).json();
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;
    const resetPasswordService = container.resolve(ResetPasswordService);
    await resetPasswordService.execute({ token, password });
    return res.status(204).json();
  }
}
