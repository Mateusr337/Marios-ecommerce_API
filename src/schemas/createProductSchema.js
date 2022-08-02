import joi from 'joi';

const createProductSchema = joi.object({
	name: joi.string().required(),
	value: joi.number().integer().required(),
	type: joi.string().required(),
	quantity: joi.number().integer(),
});

export default createProductSchema;
