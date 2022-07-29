import { Router } from 'express';
import authRouter from './authRouter.js';
import usersRouter from './usersRouter.js';

const router = Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);

export default router;
