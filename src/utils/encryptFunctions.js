import bcrypt from 'bcrypt';
import errors from './errorFunctions.js';

function encryptData(data) {
	const encrypted = bcrypt.hashSync(data, 10);
	return encrypted;
}

async function compareEncrypted(data, hash) {
	const match = await bcrypt.compare(data, hash);
	if (!match) throw errors.unauthorizedError('e-mail or password');
}

export default {
	encryptData,
	compareEncrypted,
};
