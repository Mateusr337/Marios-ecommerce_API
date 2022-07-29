import usersService from '../Services/usersService.js';

async function create(req, res) {
	await usersService.create(req.body);
	res.sendStatus(201);
}

export default {
	create,
};
