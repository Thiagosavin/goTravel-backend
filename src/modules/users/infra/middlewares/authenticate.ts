import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/appError';
import jwtConfig from '@config/jwtConfig';
interface tokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401);
  }
  const [, token] = authHeader.split(' ');
  try {
    const authToken = verify(token, jwtConfig.JWT.TOKEN);

    const { sub } = authToken as tokenPayload;
    req.user = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('Invalid JWT token.', 401);
  }
}
