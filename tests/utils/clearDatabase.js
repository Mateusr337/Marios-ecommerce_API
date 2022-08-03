import database from '../../src/database';

export default async function clearDatabase() {
	await database.order.deleteMany();
	await database.user.deleteMany();
	await database.product.deleteMany();
}
