import usersRepository from '../Repositories/usersRepository.js';
import accessKeys from '../utils/accessKeys.js';
import encryptFunctions from '../utils/encryptFunctions.js';
import errorFunctions from '../utils/errorFunctions.js';

async function create(userCreateData) {
	await validateKey(userCreateData.authorizationKey);
	delete userCreateData.authorizationKey;

	const encryptPassword = encryptFunctions.encryptData(userCreateData.password);
	const user = { ...userCreateData, password: encryptPassword };

	return await usersRepository.create(user);
}

async function find() {
	return await usersRepository.find();
}

async function validEmailUser(email) {
	const user = await usersRepository.findByEmail(email);
	if (!user) throw errorFunctions.unauthorizedError('e-mail or password');

	return user;
}

async function validateKey(key) {
	if (key === accessKeys().HR) return;
	if (key === accessKeys().manager) return;

	throw errorFunctions.unauthorizedError("you can't create user");
}

async function findById(id) {
	return await usersRepository.findById(id);
}

export default {
	create,
	find,
	validEmailUser,
	findById,
};
