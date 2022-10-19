import { z } from 'zod';
import connection from '../models/connection';
import LoginModel from '../models/login.model';
import { generateToken } from '../middlewares/auth';
import { IUser } from '../interfaces/user.interface';
import { IToken } from '../interfaces/token.interface';
import CustomError from '../error/CustomError';

export default class LoginService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public async login(user: IUser): Promise<IToken> {
    const loginSchema = z.object({
      username: z.string().min(1),
      password: z.string().min(8),
    });
    // console.log('BODY: ', user);
    
    const result = loginSchema.safeParse(user);
    // console.log('ZOD RESULT: ', result.success);
    
    if (!result.success) {
      const [{ path }] = result.error.issues;
      throw new CustomError(400, `"${path[0]}" is required`);
    }    

    const foundUser = await this.model.login(result.data);
    // console.log('USERID SERVICE: ', foundUser);
    
    if (!foundUser) throw new CustomError(401, 'Username or password invalid');

    const token = generateToken(foundUser);
    return { token };
  }
}
