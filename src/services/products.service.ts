import CustomError from '../error/CustomError';
import connection from '../models/connection';
import ProductModel from '../models/products.model';
import IProduct from '../interfaces/product.interface';
import productSchema from './utils/product.schema';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public create(product: IProduct): Promise<IProduct> {
    const result = productSchema.safeParse(product);

    if (!result.success) {
      const [{ message }] = result.error.issues;
      throw new CustomError(message);
    }

    return this.model.create(product);
  }

  public async getAll(): Promise<IProduct[]> {
    const products = await this.model.getAll();
    return products;
  }
}
