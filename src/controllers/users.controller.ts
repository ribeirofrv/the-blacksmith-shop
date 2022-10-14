import { Request, Response } from 'express';
import UserService from '../services/users.service';

class UsersController {
  constructor(private userService = new UserService()) {}

  public create = async (request: Request, response: Response) => {
    const user = request.body;
    const userCreated = await this.userService.create(user);
    response.status(201).json(userCreated);
  };
}

export default UsersController;
