import supertest from 'supertest';
import app from '../../src/app.js';

import userFactory from './userFactory';

const agent = supertest(app);

async function createLogin(key) {
	const user = await userFactory.createUser(key);

	const { body } = await agent.post('/auth/login').send({
		email: user.email,
		password: user.cleanPassword,
	});

	return {
		token: body.token,
		user,
	};
}

export default {
	createLogin,
};
