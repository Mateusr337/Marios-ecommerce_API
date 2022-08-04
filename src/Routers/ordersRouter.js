import Router from 'express';
import ordersController from '../Controllers/ordersController.js';
import ensureAuthenticatedMiddleware from '../Middlewares/ensureAuthenticatedMiddleware.js';
import validateSchemaMiddleware from '../Middlewares/validateSchemaMiddleware.js';
import createOrderSchema from '../schemas/createOrderSchema.js';

const ordersRouter = Router();

ordersRouter.post(
	'/',
	ensureAuthenticatedMiddleware,
	validateSchemaMiddleware(createOrderSchema),
	ordersController.create
);

ordersRouter.get('/', ensureAuthenticatedMiddleware, ordersController.find);
ordersRouter.get('/:id', ensureAuthenticatedMiddleware, ordersController.findById);

export default ordersRouter;
