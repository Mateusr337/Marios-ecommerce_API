import productsService from '../Services/productsService.js';

async function create({ body }, res) {
	console.log(body);
	const product = await productsService.create(body);
	res.status(201).send(product);
}

export default {
	create,
};
