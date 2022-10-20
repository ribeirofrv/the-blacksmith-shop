import { Request, Response, NextFunction } from 'express';
import CustomError from '../error/CustomError';

const ErrorMiddleware = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.log(':: ERROR:', err);

  return res.status(500).json({ message: err });
};

export default ErrorMiddleware;
