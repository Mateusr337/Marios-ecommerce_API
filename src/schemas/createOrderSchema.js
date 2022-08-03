import joi from 'joi';

const createOrderSchema = joi.object({
	type: joi.string().required(),
	productId: joi.number().integer().required(),
	value: joi.number().integer().required(),
	quantity: joi.number().integer().required(),
});

export default createOrderSchema;
