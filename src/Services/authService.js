import usersRepository from '../Repositories/usersRepository.js';
import createToken from '../utils/createToken.js';
import encryptFunctions from '../utils/encryptFunctions.js';
import usersService from './usersService.js';

async function login(loginData) {
	const user = await usersService.validEmailUser(loginData.email);
	await encryptFunctions.compareEncrypted(loginData.password, user.password);

	return createToken(user.id);
}

export default {
	login,
};
