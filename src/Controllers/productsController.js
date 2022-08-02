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
	res.send(product).status(204);
}

export default {
	create,
	update,
};
