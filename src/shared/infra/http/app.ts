import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from '@shared/infra/http/routes';
import '@shared/infra/typeorm';
import '@shared/container';
import AppError from '@shared/errors/appError';
import { errors } from 'celebrate';
import rateLimiter from './middlewares/rateLimiter';

const app = express();
const port = 5000;

app.use(rateLimiter);
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server start at port ${port}...`);
});
