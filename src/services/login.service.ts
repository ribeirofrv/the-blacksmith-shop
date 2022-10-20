import connection from '../models/connection';
import LoginModel from '../models/login.model';
import CustomError from '../error/CustomError';
import { generateToken } from '../middlewares/auth';
import { IUser } from '../interfaces/user.interface';
import { IToken } from '../interfaces/token.interface';
import loginSchema from './utils/login.schema';

export default class LoginService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public async login(user: IUser): Promise<IToken> {
    const result = loginSchema.safeParse(user);
    
    if (!result.success) {
      const [{ message }] = result.error.issues;
      throw new CustomError(message);
    }    

    const foundUser = await this.model.login(result.data);
    
    if (!foundUser) throw new CustomError('401|Username or password invalid');

    const token = generateToken(foundUser);
    return { token };
  }
}
