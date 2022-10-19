import express from 'express';
import route from './router';
import ErrorMiddleware from './middlewares/errors';
import 'express-async-errors';

const app = express();

app.use(express.json());

app.use('/login', route.login);
app.use('/products', route.products);
app.use('/users', route.users);
app.use('/orders', route.orders);

app.use(ErrorMiddleware);

export default app;
