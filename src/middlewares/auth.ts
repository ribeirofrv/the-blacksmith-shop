import jwt, { SignOptions, Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IPayload } from '../interfaces/token.interface';
import CustomError from '../error/CustomError';

/** Ref.: https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1 */
export const SECRET_KEY: Secret = 'Dragon-Head';
export const CONFIG: SignOptions = {
  algorithm: 'HS256',
};

export const generateToken = (user: IPayload): string => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    CONFIG,
  );
  return token;
};

export const decodeToken = (token: string | undefined) => jwt.decode(token as string);

export const verifyToken = (token: string) => {
  const result = jwt.verify(token, SECRET_KEY);
  if (!result) throw new CustomError('401|Invalid token');
  return result;
};

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => { 
  const token = req.header('Authorization');

  if (!token) throw new CustomError('401|Token not found');

  verifyToken(token);
  
  next();
};
