import { Pool } from 'mysql2/promise';
import { IUser, IUserLogin } from '../interfaces/user.interface';

export default class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async login(user: IUser): Promise<IUserLogin> {
    const { username, password } = user;
    const query = [
      'SELECT Users.id, Users.username',
      'FROM Trybesmith.Users',
      'WHERE Users.username = ?',
      'AND Users.password = ?;',
    ].join(' ');

    const [result] = await this.connection.execute(query, [username, password]);
    const rows = result;
    const [id] = rows as IUserLogin[];
    // console.log('MODEL DB: ', id);

    return id;
  }
}
