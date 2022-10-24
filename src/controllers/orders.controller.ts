import { Request, Response } from 'express';
import OrderService from '../services/orders.service';

class OrdersController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (_request: Request, response: Response) => {
    const orders = await this.orderService.getAll();
    
    response.status(200).json(orders);
  };

  public register = async (request: Request, response: Response) => {
    const token = request.header('Authorization');
    const orders = await this.orderService.register(token as string, request.body);
    
    response.status(201).json(orders);
  };
}

export default OrdersController;
