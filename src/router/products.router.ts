import { Router } from 'express';
import ProductsController from '../controllers/products.controller';

const router = Router();
const productsController = new ProductsController();

router.get('/', productsController.getAll);
router.post('/', productsController.create);

export default router;