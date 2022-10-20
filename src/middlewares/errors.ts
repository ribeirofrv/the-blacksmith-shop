import { Request, Response, NextFunction } from 'express';
import CustomError from '../error/CustomError';

const ErrorMiddleware = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  const { message } = err;
  if (message.includes('|')) {
    const [status, error] = message.split('|');

    return res.status(+status).json({ message: error });
  }
  console.log(':: ', err);

  return res.status(500).json({ message });
};

export default ErrorMiddleware;
