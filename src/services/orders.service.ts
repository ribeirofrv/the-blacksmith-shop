import CustomError from '../error/CustomError';
import connection from '../models/connection';
import OrderModel from '../models/orders.model';
import ProductModel from '../models/products.model';
import IOrder, { IOrderToRegister, IOrderById } from '../interfaces/order.interface';
import orderSchema from './utils/order.schema';
import { verifyToken } from '../middlewares/auth';
import { IDecodedUser } from '../interfaces/token.interface';

export default class OrderService {
  public model: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.model = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  public async getAll(): Promise<IOrder[]> {
    const orders = await this.model.getAll();
    return orders;
  }

  /** Se deus quiser eu refatoro isso um dia */
  public async register(token: string, order: IOrderToRegister): Promise<IOrderById> {
    const { productsIds } = order;
    if (!productsIds) throw new CustomError('400|"productsIds" is required');
    const result = orderSchema.safeParse(productsIds);
    if (!result.success) {
      const [{ message }] = result.error.issues;
      throw new CustomError(message);
    }
    const user = verifyToken(token);
    const { id } = user as IDecodedUser;
    const orderId = await this.model.create(id);
    await Promise.all(
      order.productsIds.map(async (productsId) => {
        await this.productModel.update(orderId, productsId);
      }),
    );
    const [registeredOrders] = await this.model.getOrderByOrderId(orderId);
    
    return registeredOrders;
  }
}
