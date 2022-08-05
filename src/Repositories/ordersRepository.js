import database from '../database.js';

async function create(order) {
	return await database.order.create({ data: order });
}

async function find() {
	return await database.order.findMany();
}

async function findByProductId(productId) {
	return await database.order.findMany({ where: { productId } });
}

async function findByType(type) {
	return await database.order.findMany({ where: { type } });
}

async function findById(id) {
	return await database.order.findUnique({ where: { id } });
}

export default {
	create,
	find,
	findById,
	findByProductId,
	findByType,
};
