import { RowDataPacket } from 'mysql2';

export interface IUser {
  id?: number,
  username: string,
  classe?: string,
  level?: number,
  password: string,
}

export interface IUserLogin extends RowDataPacket { 
  id: number,
  username: string,
}
