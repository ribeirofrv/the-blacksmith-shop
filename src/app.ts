import express from 'express';
import route from './router';
import 'express-async-errors';

const app = express();

app.use(express.json());

app.use('/products', route.products);

export default app;
