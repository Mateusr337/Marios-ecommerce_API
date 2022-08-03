import { Router } from 'express';
import authRouter from './authRouter.js';
import ordersRouter from './ordersRouter.js';
import productsRouter from './productsRouter.js';
import usersRouter from './usersRouter.js';

const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter);

export default router;
