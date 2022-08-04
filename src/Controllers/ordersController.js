import ordersService from '../Services/ordersService.js';

async function create({ body }, res) {
	const { user } = res.locals;

	const order = await ordersService.create(body, user);
	res.status(201).send(order);
}

async function find(req, res) {
	const { user } = res.locals;

	const orders = await ordersService.find(user);
	res.status(200).send(orders);
}

async function findById({ params }, res) {
	const { user } = res.locals;
	const id = parseInt(params.id);

	const order = await ordersService.findById(id, user);
	res.status(200).send(order);
}

export default {
	create,
	findById,
	find,
};
