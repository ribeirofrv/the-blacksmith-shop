import express from 'express';
import route from './router';
import 'express-async-errors';
import ErrorMiddleware from './middlewares/errors';

const app = express();

app.use(express.json());

app.use('/products', route.products);
app.use('/users', route.users);
app.use('/orders', route.orders);

app.use(ErrorMiddleware);

export default app;
