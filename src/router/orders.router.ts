import { Router } from 'express';
import { auth } from '../middlewares/auth';
import OrdersController from '../controllers/orders.controller';

const router = Router();
const ordersController = new OrdersController();

router.get('/', ordersController.getAll);
router.post('/', auth, ordersController.register);

export default router;