import { Request, Response } from 'express';
import OrderService from '../services/orders.service';

class OrdersController {
  constructor(private orderService = new OrderService()) {}

  public getAll = async (_request: Request, response: Response) => {
    const orders = await this.orderService.getAll();
    console.log(orders);
    
    response.status(200).json(orders);
  };
}

export default OrdersController;
