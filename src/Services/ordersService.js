import ordersRepository from '../Repositories/ordersRepository.js';
import errorFunctions from '../utils/errorFunctions.js';
import productsService from './productsService.js';
import accessKeys from '../utils/accessKeys.js';
import usersRepository from '../Repositories/usersRepository.js';

async function create(createOrderData, user) {
	validateAuthorization(user.key);
	validateEntry(createOrderData);

	const product = await productsService.findByIdOrFail(createOrderData.productId, user);

	if (createOrderData.type === 'sold') {
		await soldProduct(product, user);
	} else {
		await buyProduct(product, user);
	}

	return await ordersRepository.create(createOrderData);
}

async function find(user, queries) {
	validateAuthorization(user.key);

	console.log(queries.productId, queries.type);

	if (queries.productId) {
		return await ordersRepository.findByProductId(queries.productId);
	} else if (queries.type) {
		return await ordersRepository.findByType(queries.type);
	}

	return await ordersRepository.find();
}

async function findById(id, user) {
	validateAuthorization(user.key);
	return await ordersRepository.findById(id);
}

async function findByIdOrFail(id, user) {
	validateAuthorization(user.key);
	const order = await ordersRepository.findById(id);
	if (!order) throw errorFunctions.notFoundError('order');

	return order;
}

function validateAuthorization(key) {
	if (key !== accessKeys.manager && key !== accessKeys.financial)
		throw errorFunctions.unauthorizedError();
}

function validateEntry(data) {
	validateType(data.type);
	if (data.quantity < 1)
		throw errorFunctions.badRequestError('quantity must be gran more than 0');
}

function validateType(type) {
	const types = ['sold', 'buy'];
	if (!types.includes(type))
		throw errorFunctions.badRequestError('type must be "sold" or "buy"');
}

async function soldProduct(product, user) {
	if (product.quantity < 1)
		throw errorFunctions.badRequestError('empty stock this product');

	product.quantity -= 1;
	await productsService.update(product.id, product, user);
}

async function buyProduct(product, user) {
	product.quantity += 1;
	await productsService.update(product.id, product, user);
}

export default {
	create,
	find,
	findById,
	findByIdOrFail,
	validateType,
};
