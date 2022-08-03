import { Router } from 'express';
import productsController from '../Controllers/productsController.js';
import ensureAuthenticatedMiddleware from '../Middlewares/ensureAuthenticatedMiddleware.js';
import validateSchemaMiddleware from '../Middlewares/validateSchemaMiddleware.js';
import createProductSchema from '../schemas/createProductSchema.js';

const productsRouter = Router();

productsRouter.post(
	'/',
	ensureAuthenticatedMiddleware,
	validateSchemaMiddleware(createProductSchema),
	productsController.create
);

productsRouter.patch(
	'/:id',
	ensureAuthenticatedMiddleware,
	validateSchemaMiddleware(createProductSchema),
	productsController.update
);

productsRouter.get('/', ensureAuthenticatedMiddleware, productsController.find);
productsRouter.get('/:id', ensureAuthenticatedMiddleware, productsController.findById);
productsRouter.delete('/:id', ensureAuthenticatedMiddleware, productsController.remove);

export default productsRouter;
