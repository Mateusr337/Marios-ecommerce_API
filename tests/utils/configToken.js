export default function configToken(token) {
	return {
		Authorization: `Bearer ${token}`,
	};
}
