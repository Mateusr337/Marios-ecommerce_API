import usersService from '../Services/usersService.js';

async function create(req, res) {
	const user = await usersService.create(req.body);
	res.status(201).send(user);
}

async function find(req, res) {
	const { user } = res.locals;
	const users = await usersService.find(user);
	res.status(200).send(users);
}

export default {
	create,
	find,
};
