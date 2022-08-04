import { agent } from '../app.test';
import configToken from '../utils/configToken';

function insertOrderData(type, productId, quantity) {
	return {
		type,
		productId,
		value: 200000,
		quantity: quantity || 1,
	};
}

async function createOrder(token, productId, type) {
	const createOrderData = insertOrderData(type || 'buy', productId);
	const authorization = configToken(token);

	const res = await agent.post('/orders').send(createOrderData).set(authorization);
	return res;
}

export default {
	insertOrderData,
	createOrder,
};
