import jwt from 'jsonwebtoken';
import usersService from '../Services/usersService.js';
import errorFunctions from '../utils/errorFunctions.js';

export default async function ensureAuthenticatedMiddleware(req, res, next) {
	const authorization = req.headers.authorization;
	if (!authorization)
		throw errorFunctions.unauthorizedError('Missing authorization header');

	const token = authorization.replace('Bearer ', '');
	if (!token) throw errorFunctions.unauthorizedError('Missing token');

	try {
		const { userId } = jwt.verify(token, process.env.JWT_SECRET);
		const user = await usersService.findById(userId);
		res.locals.user = user;

		next();
	} catch {
		throw errorFunctions.unauthorizedError('Invalid token');
	}
}
