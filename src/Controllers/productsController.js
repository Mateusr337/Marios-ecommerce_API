import productsService from '../Services/productsService.js';

async function create({ body }, res) {
	const { user } = res.locals;

	const product = await productsService.create(body, user);
	res.status(201).send(product);
}

async function update({ body }, res) {
	const { id } = body;
	delete body.id;

	const product = await productsService.update(id, body);
	res.send(product).status(204);
}

export default {
	create,
	update,
};
