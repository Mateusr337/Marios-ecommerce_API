import database from '../database.js';

async function create(order) {
	return await database.order.create({ data: order });
}

export default {
	create,
};
