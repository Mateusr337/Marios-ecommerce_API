import jwt from 'jsonwebtoken';

export default function createToken(userId) {
	const expiration = { expiresIn: 60 * 60 * 24 * 30 };
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, expiration);

	return token;
}
