import database from '../database.js';

async function create(userData) {
	return await database.user.create({ data: { ...userData } });
}

async function find() {
	return await database.user.findMany();
}

export default {
	create,
	find,
};
