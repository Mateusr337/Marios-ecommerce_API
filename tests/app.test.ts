import supertest from 'supertest';
import app from '../src/app.js';
import database from '../src/database.js';
import accessKeys from '../src/utils/accessKeys.js';
import userFactory from './factories/userFactory.js';
import clearDatabase from './utils/clearDatabase.js';

const agent = supertest(app);

beforeEach(async () => {
	await clearDatabase();
});

describe('Route users/', () => {
	describe('POST /users', () => {
		it('should answer with code 201 and create user', async () => {
			const userInsertData = userFactory.userInsertData();
			const res = await agent.post('/users').send(userInsertData);
			const users = await database.user.findMany();

			expect(res.status).toEqual(201);
			expect(users).toHaveLength(1);
		});

		it('should answer with code 409 when repeat email', async () => {
			const userInsertData = userFactory.userInsertData();

			await agent.post('/users').send({ ...userInsertData, name: 'sarah' });
			const res = await agent.post('/users').send(userInsertData);

			const users = await database.user.findMany();

			expect(res.status).toEqual(409);
			expect(users).toHaveLength(1);
		});

		it('should answer with code 401 when access key not authorized', async () => {
			const userInsertData = userFactory.userInsertData();
			const authorizationKey = accessKeys.stock;

			const res = await agent
				.post('/users')
				.send({ ...userInsertData, authorizationKey });

			const users = await database.user.findMany();

			expect(res.status).toEqual(401);
			expect(users).toHaveLength(0);
		});
	});
	describe('GET /users', () => {
		it('should answer with status code 200 and users', async () => {
			
		});
	});
});
