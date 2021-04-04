const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Yup = require('yup');

const User = require('../models/User');

class SessionController {
	async store(req, res) {
		const { email, password } = req.body;

		const schema = Yup.object().shape({
			email: Yup.string().email().required(),
			password: Yup.string().required(),
		});

		if (!(await schema.isValid({ email, password })))
			return res.status(400).json({
				error:
					'Falha na validação. O corpo da requisição não está correto.',
			});

		try {
			const response = await User.findOne({ email });

			if (!response)
				return res
					.status(401)
					.json({ error: 'E-mail não encontrado.' });

			if (!(await bcrypt.compare(password, response.password)))
				return res.status(401).json({ error: 'Senha incorreta.' });

			// Dados do Usuário
			const { _id: id, name, username } = response;

			return res.json({
				id,
				email,
				name,
				username,
				token: jwt.sign({ id, username }, process.env.JWT_SECRET, {
					expiresIn: '7d',
				}),
			});
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
	}
}

module.exports = new SessionController();
