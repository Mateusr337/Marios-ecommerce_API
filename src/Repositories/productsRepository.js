import database from '../database.js';

async function create(product) {
	return await database.product.create({ data: product });
}

async function findByName(name) {
	return await database.product.findFirst({ where: { name } });
}

async function find() {
	return await database.product.findMany();
}

async function findById(id) {
	return await database.product.findUnique({ where: { id } });
}

async function findByPartialName(name) {
	return await database.product.findMany({ where: { name: { contains: name } } });
}

async function update(id, updateProductData) {
	return await database.product.update({ where: { id }, data: updateProductData });
}

async function remove(id) {
	await database.product.delete({ where: { id } });
}

export default {
	create,
	findByName,
	find,
	update,
	remove,
	findById,
	findByPartialName,
};
