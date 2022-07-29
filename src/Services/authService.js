import usersRepository from '../Repositories/usersRepository.js';
import createToken from '../utils/createToken.js';
import encryptFunctions from '../utils/encryptFunctions.js';
import errorFunctions from '../utils/errorFunctions.js';
import usersService from './usersService.js';

async function login(loginData) {
	const user = await usersService.validEmailUser(loginData.email);
	if (!user.active) throw errorFunctions.unauthorizedError('this user is not active');
	
	await encryptFunctions.compareEncrypted(loginData.password, user.password);

	return createToken(user.id);
}

export default {
	login,
};
