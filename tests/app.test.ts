import supertest from 'supertest';
import app from '../src/app.js';
import database from '../src/database.js';
import accessKeys from '../src/utils/accessKeys.js';
import authFactory from './factories/authFactory.js';
import userFactory from './factories/userFactory.js';
import clearDatabase from './utils/clearDatabase.js';
import configToken from './utils/configToken.js';

export const agent = supertest(app);

beforeEach(async () => {
	await clearDatabase();
});

describe('Route users/', () => {
	describe('POST /users', () => {
		it('should answer with code 201 and create user', async () => {
			const userInsertData = userFactory.userInsertData();
			const { status } = await agent.post('/users').send(userInsertData);
			const users = await database.user.findMany();

			expect(status).toEqual(201);
			expect(users).toHaveLength(1);
		});

		it('should answer with code 409 when repeat email', async () => {
			const userInsertData = userFactory.userInsertData();

			await agent.post('/users').send({ ...userInsertData, name: 'sarah' });
			const { status } = await agent.post('/users').send(userInsertData);

			const users = await database.user.findMany();

			expect(status).toEqual(409);
			expect(users).toHaveLength(1);
		});

		it('should answer with code 401 when access key not authorized', async () => {
			const userInsertData = userFactory.userInsertData();
			const authorizationKey = accessKeys.stock;

			const { status } = await agent
				.post('/users')
				.send({ ...userInsertData, authorizationKey });

			const users = await database.user.findMany();

			expect(status).toEqual(401);
			expect(users).toHaveLength(0);
		});
	});

	describe('GET /users', () => {
		it('should answer with code 200 and users', async () => {
			const { token } = await authFactory.createLogin();
			const authorization = configToken(token);
			const { body, status } = await agent.get('/users').set(authorization);

			expect(status).toEqual(200);
			expect(body).toHaveLength(1);
		});
	});
});

describe('Route /auth', () => {
	describe('POST /auth/login', () => {
		it('should with code 200 and token', async () => {
			const user = await userFactory.createUser();

			const { body, status } = await agent.post('/auth/login').send({
				email: user.email,
				password: user.cleanPassword,
			});

			expect(body.token).not.toBeNull();
			expect(status).toEqual(200);
		});

		it('should answer with code 401 when mistake password', async () => {
			const user = await userFactory.createUser();

			const { body, status } = await agent.post('/auth/login').send({
				email: user.email,
				password: 'sem senha',
			});

			expect(body.token).toBeUndefined();
			expect(status).toEqual(401);
		});
	});
});
