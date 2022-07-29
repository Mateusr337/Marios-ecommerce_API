import createToken from '../utils/createToken';

async function login() {
	const user = await validEmailUser(data.email);

	await encryptFunctions.compareEncrypted(data.password, user.password);

	createToken(user.id);

	await userRepository.sessionInsert(token);
	return token;
}

export default {
	login,
};
