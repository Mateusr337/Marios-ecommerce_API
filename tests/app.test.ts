import supertest from 'supertest';
import app from '../src/app.js';
import database from '../src/database.js';
import accessKeys from '../src/utils/accessKeys.js';
import authFactory from './factories/authFactory.js';
import orderFactory from './factories/orderFactory.js';
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

			const authorization = configToken(token);
			const { body, status } = await agent
				.get(`/products/${product.id}`)
				.set(authorization);

			expect(body).not.toBeNull();
			expect(status).toEqual(200);
		});
	});

	describe('DELETE /products/:id', () => {
		it('should answer with code 204 and delete product by id', async () => {
			const { token } = await authFactory.createLogin();
			const { body: product } = await productFactory.createProduct(token);

			const authorization = configToken(token);
			const { status } = await agent
				.delete(`/products/${product.id}`)
				.set(authorization);

			const products = await database.product.findMany();

			expect(products).toHaveLength(0);
			expect(status).toEqual(204);
		});
	});

	describe('PATCH /products/:id', () => {
		it('should answer with code 200 and update product by id', async () => {
			const { token } = await authFactory.createLogin();
			const { body: product } = await productFactory.createProduct(token);

			const newName = 'aze';
			const authorization = configToken(token);

			const { status, body } = await agent
				.patch(`/products/${product.id}`)
				.send({ name: newName })
				.set(authorization);

			const updateProduct = await database.product.findUnique({
				where: { id: product.id },
			});

			expect(updateProduct?.name).toEqual(newName);
			expect(status).toEqual(200);
		});
	});
});

describe('Route /orders', () => {
	describe('POST /orders', () => {
		it('should answer with code 201 and created order type buy', async () => {
			const { token } = await authFactory.createLogin();
			let { body: product } = await productFactory.createProduct(token);

			const createOrderData = orderFactory.insertOrderData('buy', product.id);
			const authorization = configToken(token);

			const { body, status } = await agent
				.post('/orders')
				.send(createOrderData)
				.set(authorization);

			const orders = await database.order.findMany();
			product = await database.product.findUnique({
				where: { id: product.id },
			});

			expect(status).toEqual(201);
			expect(body.id).not.toBeUndefined();
			expect(orders).toHaveLength(1);
			expect(product.quantity).toEqual(1);
		});

		it('should answer with code 201 and created order type sold', async () => {
			const { token } = await authFactory.createLogin();
			let { body: product } = await productFactory.createProduct(token, 1);

			const createOrderData = orderFactory.insertOrderData('sold', product.id);
			const authorization = configToken(token);

			const { body, status } = await agent
				.post('/orders')
				.send(createOrderData)
				.set(authorization);

			const orders = await database.order.findMany();
			product = await database.product.findUnique({
				where: { id: product.id },
			});

			expect(status).toEqual(201);
			expect(body.id).not.toBeUndefined();
			expect(orders).toHaveLength(1);
			expect(product.quantity).toEqual(0);
		});

		it('should answer with code 401 when user not authorized', async () => {
			const { token: tokenHR } = await authFactory.createLogin(accessKeys.HR);
			const { token: tokenMG } = await authFactory.createLogin();
			let { body: product } = await productFactory.createProduct(tokenMG);

			const createOrderData = orderFactory.insertOrderData('buy', product.id);
			const authorizationMG = configToken(tokenHR);

			const { body, status } = await agent
				.post('/orders')
				.send(createOrderData)
				.set(authorizationMG);

			const orders = await database.order.findMany();
			product = await database.product.findUnique({
				where: { id: product.id },
			});

			expect(status).toEqual(401);
			expect(body.id).toBeUndefined();
			expect(orders).toHaveLength(0);
			expect(product.quantity).toEqual(0);
		});
	});

	describe('GET /orders', () => {
		it('should answer with code 200 and orders', async () => {
			const { token } = await authFactory.createLogin();
			const { body: product } = await productFactory.createProduct(token, 2);
			await orderFactory.createOrder(token, product.id);

			const authorization = configToken(token);
			const { body, status } = await agent.get('/orders').set(authorization);

			expect(status).toEqual(200);
			expect(body).toHaveLength(1);
		});
	});

	describe('GET /orders/:id', () => {
		it('should answer with code 200 and order by id', async () => {
			const { token } = await authFactory.createLogin();
			const { body: product } = await productFactory.createProduct(token, 2);
			await orderFactory.createOrder(token, product.id);

			const authorization = configToken(token);
			const { body, status } = await agent
				.get(`/orders/${product.id}`)
				.set(authorization);

			expect(status).toEqual(200);
			expect(body).not.toBeUndefined();
		});
	});
});
