import productsRepository from '../Repositories/productsRepository.js';
import accessKeys from '../utils/accessKeys.js';
import errorFunctions from '../utils/errorFunctions.js';

async function create(createProductData, user) {
	if (user.key !== accessKeys.manager && user.key !== accessKeys.stock)
		return errorFunctions.unauthorizedError();

	const foundProduct = await productsRepository.findByName(createProductData.name);
	if (foundProduct) throw errorFunctions.conflictRequestError('name');

	return await productsRepository.create(createProductData);
}

async function update(id, updateProductData, user) {
	if (user.key !== accessKeys.manager && user.key !== accessKeys.stock)
		return errorFunctions.unauthorizedError();

	return await productsRepository.update(id, updateProductData);
}

async function remove(id, user) {
	if (user.key !== accessKeys.manager && user.key !== accessKeys.stock)
		return errorFunctions.unauthorizedError();

	await productsRepository.remove(id);
}

async function find(user, name) {
	if (user.key !== accessKeys.manager && user.key !== accessKeys.stock)
		return errorFunctions.unauthorizedError();

	if (name) return productsRepository.findByPartialName(name);

	return await productsRepository.find();
}

async function findById(id, user) {
	if (user.key !== accessKeys.manager && user.key !== accessKeys.stock)
		return errorFunctions.unauthorizedError();

	return await productsRepository.findById(id);
}

async function findByIdOrFail(id, user) {
	const product = await findById(id, user);
	if (!product) throw errorFunctions.notFoundError('product no exist');

	return product;
}

export default {
	create,
	update,
	remove,
	find,
	findById,
	findByIdOrFail,
};
