import productsRepository from '../Repositories/productsRepository.js';
import errorFunctions from '../utils/errorFunctions.js';

async function create(product) {
	const foundProduct = await productsRepository.findByName(product.name);
	if (foundProduct) throw errorFunctions.conflictRequestError('name');

	return await productsRepository.create(product);
}

async function update(id, updateProductData) {
	return await productsRepository.create(id, updateProductData);
}

export default {
	create,
	update,
};
