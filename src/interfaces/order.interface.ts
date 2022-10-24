export default interface IOrder {
  id: number;
  userId: number;
  productsIds: number[];
}

export interface IOrderById {
  userId: number;
  productsIds: number[];
}

export interface IOrderToRegister {
  productsIds: number[];
}
