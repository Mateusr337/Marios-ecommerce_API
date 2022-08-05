import ordersService from '../Services/ordersService.js';
import errorFunctions from '../utils/errorFunctions.js';

async function create({ body }, res) {
	const { user } = res.locals;

	const order = await ordersService.create(body, user);
	res.status(201).send(order);
}

async function find({ query }, res) {
	const { user } = res.locals;
	const productId = parseInt(query.productId) || null;

	if (query.type) ordersService.validateType(query.type);

	if (productId && typeof productId !== 'number')
		throw errorFunctions.badRequestError('query productId must be number');

	const orders = await ordersService.find(user, { ...query, productId });
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
