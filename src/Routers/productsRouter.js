import { Router } from 'express';
import productsController from '../Controllers/productsController.js';
import validateSchemaMiddleware from '../Middlewares/validateSchemaMiddleware.js';
import createProductSchema from '../schemas/createProductSchema.js';

const productsRouter = Router();

productsRouter.post(
	'/',
	validateSchemaMiddleware(createProductSchema),
	productsController.create
);

export default productsRouter;
