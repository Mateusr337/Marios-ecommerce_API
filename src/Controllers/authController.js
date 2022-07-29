import authService from '../Services/authService.js';

async function login(req, res) {
	const token = await authService.login(req.body);
	res.status(200).send({ token });
}

export default {
	login,
};
