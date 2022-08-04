import supertest from 'supertest';
import app from '../../src/app';
import { faker } from '@faker-js/faker';

const agent = supertest(app);

function userInsertData(key) {
	const userData = {
		name: faker.name.findName(),
		email: faker.internet.email(),
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
