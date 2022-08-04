import supertest from 'supertest';
import app from '../src/app.js';
import database from '../src/database.js';
import accessKeys from '../src/utils/accessKeys.js';
import authFactory from './factories/authFactory.js';
import productFactory from './factories/productFactory.js';
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

describe('Route /products', () => {
	describe('POST /products', () => {
		it('should answer with code 201 and created product', async () => {
			const { token } = await authFactory.createLogin();
			const productInsertData = productFactory.insertProductData();
			const authorization = configToken(token);

			const { status } = await agent
				.post('/products')
				.send(productInsertData)
				.set(authorization);

			const products = await database.product.findMany();

			expect(status).toEqual(201);
			expect(products).toHaveLength(1);
		});

		it('should answer with code 401 when user not authorized', async () => {
			const { token, user } = await authFactory.createLogin(accessKeys.HR);
			const productInsertData = productFactory.insertProductData();
			const authorization = configToken(token);

			console.log(user);

			const { status } = await agent
				.post('/products')
				.send(productInsertData)
				.set(authorization);

			const products = await database.product.findMany();

			expect(status).toEqual(401);
			expect(products).toHaveLength(0);
		});
	});

	describe('GET /products', () => {
		it('should answer with code 200 and products', async () => {
			const { token } = await authFactory.createLogin();
			await productFactory.createProduct(token);

			const authorization = configToken(token);
			const { body, status } = await agent.get('/users').set(authorization);

			expect(body).toHaveLength(1);
			expect(status).toEqual(200);
		});
	});

	describe('GET /products/:id', () => {
		it('should answer with code 200 and product by id', async () => {
			const { token } = await authFactory.createLogin();
			const { body: product } = await productFactory.createProduct(token);

			console.log(product);

			const authorization = configToken(token);
			const { body, status } = await agent
				.get(`/products/${product.id}`)
				.set(authorization);

			expect(body).not.toBeNull();
			expect(status).toEqual(200);
		});
	});
});
