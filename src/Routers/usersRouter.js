import { Router } from 'express';
import validateSchemaMiddleware from '../Middlewares/validateSchemaMiddleware.js';
import usersController from '../Controllers/usersController.js';
import createUserSchema from '../schemas/createUserSchema.js';
import ensureAuthenticatedMiddleware from '../Middlewares/ensureAuthenticatedMiddleware.js';

const usersRouter = Router();

usersRouter.post('/', validateSchemaMiddleware(createUserSchema), usersController.create);

usersRouter.get('/', ensureAuthenticatedMiddleware, usersController.find);

export default usersRouter;
