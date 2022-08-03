import productsService from '../Services/productsService.js';

async function create({ body }, res) {
	const { user } = res.locals;

	const product = await productsService.create(body, user);
	res.status(201).send(product);
}

async function update({ body, params }, res) {
	const id = parseInt(params.id);
	const { user } = res.locals;
	delete body.id;

	const product = await productsService.update(id, body, user);
	res.send(product).status(200);
}

async function remove({ params }, res) {
	const id = parseInt(params.id);
	const { user } = res.locals;

	await productsService.remove(id, user);
	res.sendStatus(204);
}

async function find({ query }, res) {
	const { user } = res.locals;
	const { name } = query;

	const products = await productsService.find(user, name);
	res.send(products).status(200);
}

async function findById({ params }, res) {
	const { user } = res.locals;
	const id = parseInt(params.id);

	const product = await productsService.findById(id, user);
	res.send(product).status(200);
}

export default {
	create,
	update,
	remove,
	find,
	findById,
};
