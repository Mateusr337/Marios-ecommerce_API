import supertest from 'supertest';
import app from '../../src/app';

const agent = supertest(app);

function userInsertData(key) {
	const userData = {
		name: 'mateus',
		email: 'mateus@email.com',
		password: '123456',
		authorizationKey: 'bananinha',
		key: key || 'bananinha',
	};

	return userData;
}

async function createUser(key) {
	const userData = userInsertData(key);
	const { body } = await agent.post('/users').send(userData);
	return {
		...body,
		cleanPassword: userData.password,
	};
}

export default {
	userInsertData,
	createUser,
};
