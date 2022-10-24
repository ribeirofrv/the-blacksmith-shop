import { ErrorRequestHandler } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

const ErrorMiddleware: ErrorRequestHandler = (error, _request, response, _next) => {
  const { message } = error;
  if (message.includes('|')) {
    const [status, err] = message.split('|');

    return response.status(+status).json({ message: err });
  }

  if (error instanceof JsonWebTokenError) {
    return response.status(401).json({ message: 'Invalid token' });
  }

  console.log(':: ', error);

  return response.status(500).json({ message: 'Something went wrong!' });
};

export default ErrorMiddleware;
