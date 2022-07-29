import usersRepository from '../Repositories/usersRepository.js';
import encryptFunctions from '../utils/encryptFunctions.js';
import errorFunctions from '../utils/errorFunctions.js';

async function create(userCreateData) {
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

export default {
	create,
	find,
	validEmailUser,
};
