import ordersService from '../Services/ordersService.js';

async function create({ body }, res) {
	const { user } = res.locals;

	const product = await ordersService.create(body, user);
	res.status(201).send(product);
}

export default {
	create,
};
