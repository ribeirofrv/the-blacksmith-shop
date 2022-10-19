import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginsController {
  constructor(private loginService = new LoginService()) {}

  public login = async (request: Request, response: Response) => {
    const user = request.body;
    const token = await this.loginService.login(user);
    
    response.status(200).json(token);
  };
}
