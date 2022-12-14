import { agent } from '../app.test';
import configToken from '../utils/configToken';
import { faker } from '@faker-js/faker';

function insertProductData(quantity) {
	return {
		name: faker.commerce.product(),
		value: 200000,
		type: 'home appliance',
		quantity: quantity || 0,
	};
}

async function createProduct(token, quantity) {
	const productInsertData = insertProductData(quantity);
	const authorization = configToken(token);

	const { status, body } = await agent
		.post('/products')
		.send(productInsertData)
		.set(authorization);

	return { status, body };
}

export default {
	insertProductData,
	createProduct,
};
