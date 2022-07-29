import database from '../database.js';

async function create(userData) {
	return await database.user.create({ data: { ...userData } });
}

export default {
	create,
};
