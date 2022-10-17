import { Pool } from 'mysql2/promise';
import IOrder from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;
  
  constructor(connection: Pool) {
    this.connection = connection;
  }
  
  public async getAll(): Promise<IOrder[]> {
    const query = [
      'SELECT Orders.id as id,',
      'Orders.userId as userId,',
      'JSON_ARRAYAGG(Products.id) as productsIds',
      'FROM Trybesmith.Orders',
      'JOIN Trybesmith.Products',
      'WHERE Orders.id = Products.orderId',
      'GROUP BY Orders.id;',
    ].join(' ');
  
    const [orders] = await this.connection.execute(query);
  
    return orders as IOrder[];
  }
}
