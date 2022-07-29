import database from '../database.js';

async function createSession(token) {
	const session = await database.session.create({ data: { token } });
	return session;
}

export default {
	createSession,
};
