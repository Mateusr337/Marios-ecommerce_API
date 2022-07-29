import { Router } from 'express';
import validateSchemaMiddleware from '../Middlewares/validateSchemaMiddleware.js';
import usersController from '../Controllers/usersController.js';
import createUserSchema from '../schemas/createUserSchema.js';

const usersRouter = Router();

usersRouter.post(
	'/create',
	validateSchemaMiddleware(createUserSchema),
	usersController.create
);

usersRouter.get('/', usersController.find);

export default usersRouter;
