import productsRepository from '../Repositories/productsRepository.js';
import accessKeys from '../utils/accessKeys.js';
import errorFunctions from '../utils/errorFunctions.js';

async function create(product, user) {
	console.log(user);
	if (user.key !== accessKeys.manager && user.key !== accessKeys.stock)
		return errorFunctions.unauthorizedError();

	const foundProduct = await productsRepository.findByName(product.name);
	if (foundProduct) throw errorFunctions.conflictRequestError('name');

	return await productsRepository.create(product);
}

async function update(id, updateProductData) {
	if (user.key !== accessKeys.manager && user.key !== accessKeys.stock)
		return errorFunctions.unauthorizedError();

	return await productsRepository.create(id, updateProductData);
}

export default {
	create,
	update,
};
