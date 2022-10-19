import { Request, Response, NextFunction } from 'express';
import CustomError from '../error/CustomError';

const ErrorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response => {
  if (err as CustomError) {
    console.log(err);
    
    // return res.status(err.statusCode).json({ message: err.message });
  }
  console.log(':: ERROR:', err);

  return res.status(500).json({ message: err.message });
};

export default ErrorMiddleware;
