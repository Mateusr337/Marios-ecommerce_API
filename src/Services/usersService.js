import usersRepository from '../Repositories/usersRepository.js';

async function create(userCreateData) {
	return await usersRepository.create(userCreateData);
}

export default {
	create,
};
