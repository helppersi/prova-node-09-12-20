const jwt = require('jsonwebtoken');
const { promisify } = require('util');

require('dotenv').config();

module.exports = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader)
		return res.status(401).json({ error: 'Token não existe.' });

	const [, token] = authHeader.split(' ');

	try {
		const decoded = await promisify(jwt.verify)(
			token,
			process.env.JWT_SECRET
		);

		req.user_id = decoded.id;
		req.username = decoded.username;

		return next();
	} catch (err) {
		return res.status(401).json({ error: 'Token inválido.' });
	}
};
