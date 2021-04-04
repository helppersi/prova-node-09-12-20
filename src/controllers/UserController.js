const Yup = require('yup');

const User = require('../models/User');

class UserController {
	// Lista todos os usuários
	async index(req, res) {
		try {
			const response = await User.find({ ...req.query });

			return res.json(response);
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
	}

	// Lista informações do usuário correspondente ao id passado na URL
	async show(req, res) {
		const { user_id } = req.params;

		const schema = Yup.object().shape({
			user_id: Yup.string().required(),
		});

		if (!(await schema.isValid({ user_id })))
			return res.status(400).json({
				error:
					'Falha na validação. O corpo da requisição não está correto.',
			});

		try {
			const response = await User.findOne({
				_id: user_id,
				...req.query,
			});

			return res.json(response);
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			username: Yup.string().required(),
			email: Yup.string().email().required(),
			password: Yup.string().required().min(6),
			password_confirm: Yup.string().when('password', (password, field) =>
				password ? field.required().oneOf([Yup.ref('password')]) : field
			),
		});

		if (!(await schema.isValid(req.body)))
			return res.status(400).json({
				error:
					'Falha na validação. O corpo da requisição não está correto.',
			});

		try {
			const userExists = await User.findOne({
				$or: [
					{ email: req.body.email },
					{ username: req.body.username },
				],
			});

			if (userExists)
				return res
					.status(400)
					.json({ error: 'Esse usuário já existe.' });

			const response = await User.create(req.body);

			return res.json(response);
		} catch (err) {
			return res.json({ error: err.message });
		}
	}

	async update(req, res) {
		const { user_id } = req.params;

		const schema = Yup.object().shape({
			name: Yup.string(),
			username: Yup.string(),
			email: Yup.string().email(),
			password: Yup.string().min(6),
			password_confirm: Yup.string().when('password', (password, field) =>
				password ? field.required().oneOf([Yup.ref('password')]) : field
			),
			user_id: Yup.string().required(),
		});

		if (!(await schema.isValid({ ...req.body, user_id })))
			return res.status(400).json({
				error:
					'Falha na validação. O corpo da requisição não está correto.',
			});

		try {
			const user = await User.findById(user_id);

			// Validando se esse e-mail não pertence a outro usuário
			if (req.body.email && req.body.email !== user.email) {
				const userExists = await User.findOne({
					email: req.body.email,
				});

				if (userExists)
					return res.status(400).json({
						error: 'Esse e-mail já pertence a outro usuário.',
					});
			}

			if (req.body.username && req.body.username !== user.username) {
				const userExists = await User.findOne({
					username: req.body.username,
				});

				if (userExists)
					return res.status(400).json({
						error:
							'Esse nome de usuário já pertence a outro usuário.',
					});
			}

			const response = await User.findOneAndUpdate(
				{ _id: user_id },
				req.body,
				{ new: true }
			);

			return res.json(response);
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
	}

	async destroy(req, res) {
		const { user_id } = req.params;

		try {
			const response = await User.findById(user_id);

			await response.remove();

			return res.json({ message: 'Exclusão bem sucedida.' });
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
	}
}

module.exports = new UserController();
