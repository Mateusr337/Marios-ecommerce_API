import usersRepository from '../Repositories/usersRepository.js';

async function create(userCreateData) {
	return await usersRepository.create(userCreateData);
}

async function find() {
	return await usersRepository.find();
}

export default {
	create,
	find,
};
