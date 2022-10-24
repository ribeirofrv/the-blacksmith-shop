import { Pool, ResultSetHeader } from 'mysql2/promise';
import IOrder, { IOrderById } from '../interfaces/order.interface';

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

  public async create(order: number): Promise<number> {
    const query = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      query,
      [order],
    );
    return insertId;
  }

  public async getOrderByOrderId(id: number): Promise<IOrderById[]> {
    const query = [
      'SELECT Orders.userId as userId,',
      'JSON_ARRAYAGG(Products.id) as productsIds',
      'FROM Trybesmith.Orders',
      'JOIN Trybesmith.Products',
      'WHERE Orders.id = Products.orderId',
      'AND Orders.id = ?',
      'GROUP BY Orders.id;',
    ].join(' ');

    const [order] = await this.connection.execute(query, [id]);

    return order as IOrderById[];
  }
}
// SELECT * FROM `Products` LIMIT 100;
