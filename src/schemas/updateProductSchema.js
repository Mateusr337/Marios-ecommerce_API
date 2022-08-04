import joi from 'joi';

const updateProductSchema = joi.object({
	name: joi.string(),
	value: joi.number().integer(),
	type: joi.string(),
	quantity: joi.number().integer(),
});

export default updateProductSchema;
