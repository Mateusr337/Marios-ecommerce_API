import { Router } from 'express';
import usersController from '../Controllers/usersController.js';

const usersRouter = Router();

usersRouter.post('/create', usersController.create);

export default usersRouter;
