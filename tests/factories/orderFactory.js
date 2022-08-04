function insertOrderData(type, productId, quantity) {
	return {
		type,
		productId,
		value: 200000,
		quantity: quantity || 1,
	};
}

export default {
	insertOrderData,
};
