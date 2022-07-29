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

export default {
	create,
	find,
	findByEmail,
};
