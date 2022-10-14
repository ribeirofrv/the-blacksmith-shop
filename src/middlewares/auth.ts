import jwt, { SignOptions, Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

/** Ref.: https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1 */
export const SECRET_KEY: Secret = 'Dragon-Head';
export const CONFIG: SignOptions = {
  algorithm: 'HS256',
};

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization');

    if (!token) throw new Error('401|Token not found');

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (error) {
    throw new Error('401|Expired or invalid token');
  }
};
