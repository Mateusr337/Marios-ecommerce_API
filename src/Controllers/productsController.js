import productsService from '../Services/productsService.js';

async function create({ body }, res) {
	const product = await productsService.create(body);
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
