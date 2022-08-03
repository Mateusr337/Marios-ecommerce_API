import supertest from 'supertest';
import app from '../src/app.js';

const agent = supertest(app);

describe('Route users/auth', () => {
	describe('POST /users', () => {
		it('should answer with code 201 and create user', async () => {
			const userInsertData = {
				name: 'mateus',
				email: 'mateus@email.com',
				password: '123456',
				authorizationKey: 'bananinha',
				key: 'bananinha',
			};

			const res = await agent.post('/users').send(userInsertData);

			console.log(res.body);

			expect(res.status).toEqual(201);
		});
	});
});
