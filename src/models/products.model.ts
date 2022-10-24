import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(product: Product): Promise<Product> {
    const { name, amount } = product;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );

    return { id: insertId, name, amount };
  }

  public async getAll(): Promise<Product[]> {
    const [products] = await this.connection.execute(
      'SELECT * FROM Trybesmith.Products',
    );

    return products as Product[];
  }

  public async update(orderId: number, productsId: number) {
    await this.connection.execute(
      'UPDATE Trybesmith.Products SET orderId = ? WHERE Products.id = ?',
      [orderId, productsId],
    );
  }
}
