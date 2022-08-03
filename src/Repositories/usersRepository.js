import database from '../database.js';

async function create(userData) {
	return await database.user.create({ data: { ...userData } });
}

async function find() {
	return await database.user.findMany();
}

async function findByEmail(email) {
	return await database.user.findUnique({ where: { email } });
}

async function findByName(name) {
	return await database.user.findUnique({ where: { name } });
}

async function findById(id) {
	return await database.user.findUnique({ where: { id } });
}

export default {
	create,
	find,
	findByEmail,
	findById,
	findByName,
};
