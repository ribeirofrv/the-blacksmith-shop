import { Request, Response } from 'express';
import ProductService from '../services/products.service';

class ProductsController {
  constructor(private productService = new ProductService()) {}

  public create = async (request: Request, response: Response) => {
    const product = request.body;
    const productCreated = await this.productService.create(product);
    response.status(201).json(productCreated);
  };

  public getAll = async (_request: Request, response: Response) => {
    const products = await this.productService.getAll();
    response.status(200).json(products);
  };
}

export default ProductsController;
