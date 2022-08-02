import database from '../database.js';

async function create(product) {
	return await database.product.create({ data: product });
}

async function findByName(name) {
	return await database.product.findFirst({ where: { name } });
}

async function find() {
	return await database.product.findFirst();
}

export default {
	create,
	findByName,
	find,
};
