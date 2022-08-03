import ordersRepository from '../Repositories/ordersRepository.js';
import errorFunctions from '../utils/errorFunctions.js';
import productsService from './productsService.js';
import accessKeys from '../utils/accessKeys.js';

async function create(createOrderData, user) {
	validateAuthorization(user.key);
	validateEntry(createOrderData);

	const product = await productsService.findByIdOrFail(createOrderData.productId, user);

	if (product.quantity < 1)
		throw errorFunctions.badRequestError('empty stock this product');

	await soldProduct(product, user);
	return await ordersRepository.create(createOrderData);
}

function validateAuthorization(key) {
	if (key !== accessKeys.manager && key !== accessKeys.financial)
		return errorFunctions.unauthorizedError();
}

function validateEntry(data) {
	const types = ['sold', 'buy'];
	if (!types.includes(data.type))
		throw errorFunctions.badRequestError('type must be "sold" or "buy"');

	if (data.quantity < 1)
		throw errorFunctions.badRequestError('quantity must be gran more than 0');
}

async function soldProduct(product, user) {
	product.quantity -= 1;

	await productsService.update(product.id, product, user);
}

export default {
	create,
};