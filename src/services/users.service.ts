import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import UserModel from '../models/users.model';
import CustomError from '../error/CustomError';
import { IUser } from '../interfaces/user.interface';
import { IToken } from '../interfaces/token.interface';
import { SECRET_KEY, CONFIG } from '../middlewares/auth';
import userSchema from './utils/user.schema';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: IUser): Promise<IToken> {
    const result = userSchema.safeParse(user);

    if (!result.success) {
      const [{ message }] = result.error.issues;
      throw new CustomError(message);
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      SECRET_KEY,
      CONFIG,
    );

    await this.model.create(user);
    return { token };
  }
}
