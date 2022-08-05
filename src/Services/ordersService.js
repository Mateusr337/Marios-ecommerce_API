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
		await soldProduct(product, createOrderData, user);
	} else {
		await buyProduct(product, createOrderData, user);
	}

	return await ordersRepository.create(createOrderData);
}

async function find(user, queries) {
	validateAuthorization(user.key);

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

async function soldProduct(product, createOrderData, user) {
	if (product.quantity < createOrderData.quantity)
		throw errorFunctions.badRequestError('no have this quantity');

	const newQuantity = product.quantity - createOrderData.quantity;
	await productsService.update(product.id, { quantity: newQuantity }, user);
}

async function buyProduct(product, createOrderData, user) {
	const newQuantity = product.quantity + createOrderData.quantity;
	await productsService.update(product.id, { quantity: newQuantity }, user);
}

export default {
	create,
	find,
	findById,
	findByIdOrFail,
	validateType,
};
