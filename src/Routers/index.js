import { Router } from 'express';
import usersRouter from './usersRouter.js';

const router = Router();

router.use('/users', usersRouter);

export default router;
