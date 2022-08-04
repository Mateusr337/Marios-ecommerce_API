import supertest from 'supertest';
import app from '../../src/app';

const agent = supertest(app);

function userInsertData() {
	const userData = {
		name: 'mateus',
		email: 'mateus@email.com',
		password: '123456',
		authorizationKey: 'bananinha',
		key: 'bananinha',
	};

	return userData;
}

async function createUser() {
	const userData = userInsertData();
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
