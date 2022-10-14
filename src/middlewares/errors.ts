import { Request, Response, NextFunction } from 'express';

const ErrorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { message } = err;

  if (message.includes('|')) {
    const [code, errorMessage] = message.split('|');
    return res.status(+code).json({ message: errorMessage });
  }
  return res.status(500).json(message);
};

export default ErrorMiddleware;
