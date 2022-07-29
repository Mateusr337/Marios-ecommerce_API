import joi from 'joi';

const createUserSchema = joi.object({
	name: joi.string().required(),
	email: joi.string().required().email(),
	password: joi.string().required(),
	key: joi.string().required(),
	active: joi.boolean(),
});

export default createUserSchema;
