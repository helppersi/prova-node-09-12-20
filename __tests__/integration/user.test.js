/**
 * Validações
 *
 * 01 - [x] POST: Não posso criar usuário cujo email já exista
 * 02 - [x] POST: Não posso criar um usuário cujo nome de usuário já exista
 * 03 - [ ] PUT:  Ao Editar um usuário, quando inserir um novo email ou nome de usuário, esse email/nome de usuario não pode ja estar vinculado a outro usuário
 * 04 - [ ] PUT:  Ao atualizar senha tenho q enviar uma propriedade de password_confirm
 * 05 - [ ] PUT:  Ao atualizar senha ela deve coididir com o que enviei em password_confirm
 * 06 - [X] GET:  Ao acessar rotas de listagem de usuários devo estar autenticado
 * 07 - [X] GET:  ao acessar rotas de listagem de usuários por ID devo estar autenticado
 * 08 - [X] GET:  na rota de listagem de usuarios por id Ao enviar um ID que não existe ele deve me retornar um erro
 * 09 - [ ] PUT:  na rota de atualizar usuario ao tentar atualizar informações de um id que não exista ele deve me retornar erro
 * 10 - [x] PUT:  Ao atualizar senha ela deve ser encriptada
 * 11 - [x] POST:  Ao Cadastrar senha ela deve ser encriptada
 * 12 - [x] POST:  Campo de Confirmar Senha e senha não concidem
 * 13 - [x] POST:  Campo de Confirmar Senha ou senha não é enviado
 * 14 - [x] POST:  Ao Cadastrar Novo Usuário Bem Sucedido se Cumprir os Requisitos
 * 14 - [x] PUT:  Não deixar editar se não estiver autenticado
 */

 const request = require('supertest');
 const jwt = require('jsonwebtoken');
 const faker = require('faker');

 const app = require('../../src/app');
 const dbHandler = require('../DatabaseMemoryTemporary');
 const Model = require('../Models');

 // Connect Database Temporary
 beforeAll(() => {
	 dbHandler.createConnection();
 });

 // Disconnect Database Temporary
 afterAll(() => {
	 dbHandler.disconnect();
 });

 describe('Listagem de Todos os Usuários: GET /users', () => {
	 it('Quanto é enviado um token valido no cabeçalho da requisição', async () => {
		 const { _id: id, username } = await Model.createUser({ password: '123456' });

		 const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn: '7d'});

		 const response = await request(app)
			 .get('/users')
			 .set('authorization', `Bearer ${token}`)

		 expect(response.status).toBe(200);
	 }, 999999);

	 it('Quanto não é enviado um token valido no cabeçalho da requisição', async () => {
		const { _id: id, email } = await Model.createUser({ password: '123456' });

		const response = await request(app)
			.get('/users')
			.set('authorization', 'Bearer ')

		 expect(response.status).toBe(401);
	 }, 999999);

	 it('Quanto não é enviado um token no cabeçalho da requisição', async () => {
		await Model.createUser({ password: '123456' });

		const response = await request(app)
			.get('/users')

		 expect(response.status).toBe(401);
	 }, 999999);
 });
 describe('Listagem de Usuários por ID: GET /users/:user_id', () => {
	it('Quanto é enviado um token valido no cabeçalho da requisição', async () => {
		const { _id: id, username } = await Model.createUser({ password: '123456' });
		const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn: '7d'});

		const response = await request(app)
			.get(`/users/${id}`)
			.set('authorization', `Bearer ${token}`)

		expect(response.status).toBe(200);
	}, 999999);

	it('Quanto não é enviado um token valido no cabeçalho da requisição', async () => {
		const { _id: id, email } = await Model.createUser({ password: '123456' });

		const response = await request(app)
			.get(`/users/${id}`)
			.set('authorization', 'Bearer 12345678910')

		expect(response.status).toBe(401);
	}, 999999);

	it('Quanto não é enviado um token no cabeçalho da requisição', async () => {
		const { _id: id } = await Model.createUser({ password: '123456' });

		const response = await request(app)
			.get(`/users/${id}`)

		expect(response.status).toBe(401);
	}, 999999);

	it('Busca de usuário por ID enviando um ID inválido', async () => {
		const { _id: id, username } = await Model.createUser({ password: '123456' });
		const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn: '7d'});

		const response = await request(app)
			.get('/users/5455544545')
			.set('authorization', `Bearer ${token}`)

		expect(response.status).toBe(400);
	}, 999999);

	it('Busca de usuário por ID enviando um ID válido', async () => {
		const { _id: id, username } = await Model.createUser({ password: '123456' });
		const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn: '7d'});

		const response = await request(app)
			.get(`/users/${id}`)
			.set('authorization', `Bearer ${token}`)

		expect(response.status).toBe(200);
	}, 999999);
 });

describe('Cadastro de Usuários: POST /users', () => {
	it('Quando e-mail já existe', async () => {
		const { email } = await Model.createUser({ password: '123456' });

		const userExists = {
			name:  faker.name.findName(),
			username: faker.internet.userName(),
			email,
			password: faker.internet.password(),
		};

		const response = await request(app)
			.post('/users')
			.send({ ...userExists, password_confirm: userExists.password });

		expect(response.status).toBe(400);
	}, 999999);

	it('Quando nome de usuário já existe', async () => {
		const { username } = await Model.createUser({ password: '123456' });

		const userExists = {
			name:  faker.name.findName(),
			username,
			email: faker.internet.email(),
			password: faker.internet.password(),
		};

		const response = await request(app)
			.post('/users')
			.send({ ...userExists, password_confirm: userExists.password });

		expect(response.status).toBe(400);
	}, 999999);

	it('Quando cadastro é bem sucedido', async () => {
		const user = {
			name:  faker.name.findName(),
			username: faker.internet.userName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};

		const response = await request(app)
			.post('/users')
			.send({ ...user, password_confirm: user.password });

		expect(response.status).toBe(200);
	}, 999999);

	it('Quando a senha não coincide com o campo de confirmar a senha', async () => {
		const response = await request(app)
			.post('/users')
			.send({
				name:  faker.name.findName(),
				username: faker.internet.userName(),
				email: faker.internet.email(),
				password: faker.internet.password(),
				password_confirm: '123456',
			});

		expect(response.status).toBe(400);
	}, 999999);

	it('Quando não é enviado o campo de confirmar senha no corpo da requisição', async () => {
		const response = await request(app)
			.post('/users')
			.send({
				name:  faker.name.findName(),
				username: faker.internet.userName(),
				email: faker.internet.email(),
				password: faker.internet.password(),
			});

		expect(response.status).toBe(400);
	}, 999999);

	it('Quando não é enviado senha e nem confirmar senha no corpo da requisição', async () => {
		const response = await request(app)
			.post('/users')
			.send({
				name:  faker.name.findName(),
				username: faker.internet.userName(),
				email: faker.internet.email()
			});

		expect(response.status).toBe(400);
	}, 999999);


});

describe('Editar Usuários: PUT /users', () => {
	it('Quando ID informado não existe', async () => {
		const { _id: id, username } = await Model.createUser({ password: '123456' });

		const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn: '7d'});

		const userExists = {
			name:  faker.name.findName(),
			username: faker.internet.userName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};

		const response = await request(app)
			.put(`/users/6565489879872`)
			.set('authorization', `Bearer ${token}`)
			.send({ ...userExists, password_confirm: userExists.password });

		expect(response.status).toBe(400);
	}, 999999);
	it('Quando e-mail já existe', async () => {
		const { email } = await Model.createUser({ password: '123456' });
		const { _id: id, username } = await Model.createUser({ password: '123456' });

		const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn: '7d'});

		const userExists = {
			name:  faker.name.findName(),
			username: faker.internet.userName(),
			email,
			password: faker.internet.password(),
		};

		const response = await request(app)
			.put(`/users/${id}`)
			.set('authorization', `Bearer ${token}`)
			.send({ ...userExists, password_confirm: userExists.password });

		expect(response.status).toBe(400);
	}, 999999);

	it('Quando nome de usuário já existe', async () => {
		const user = await Model.createUser({ password: '123456' });
		const { _id: id, username } = await Model.createUser({ password: '123456' });

		const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn: '7d'});

		const userExists = {
			name:  faker.name.findName(),
			username: user.username,
			email: faker.internet.email(),
			password: faker.internet.password(),
		};

		const response = await request(app)
			.put(`/users/${id}`)
			.set('authorization', `Bearer ${token}`)
			.send({ ...userExists, password_confirm: userExists.password });

		expect(response.status).toBe(400);
	}, 999999);

	it('Quando edição é bem sucedido', async () => {
		const { _id: id, username } = await Model.createUser({ password: '123456' });

		const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn: '7d'});

		const user = {
			name:  faker.name.findName(),
			username: faker.internet.userName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};

		const response = await request(app)
			.put(`/users/${id}`)
			.set('authorization', `Bearer ${token}`)
			.send({ ...user, password_confirm: user.password });

		expect(response.status).toBe(200);
	}, 999999);

	it('Quando não é enviado token na hora de editar', async () => {
		const { _id: id } = await Model.createUser({ password: '123456' });
		const user = {
			name:  faker.name.findName(),
			username: faker.internet.userName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};

		const response = await request(app)
			.put(`/users/${id}`)
			.send({ ...user, password_confirm: user.password });

		expect(response.status).toBe(401);
	}, 999999);

	it('Quando a senha não coincide com o campo de confirmar a senha', async () => {
		const { _id: id, username } = await Model.createUser({ password: '123456' });
		const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn: '7d'});

		const response = await request(app)
			.put(`/users/${id}`)
			.set('authorization', `Bearer ${token}`)
			.send({
				name:  faker.name.findName(),
				username: faker.internet.userName(),
				email: faker.internet.email(),
				password: faker.internet.password(),
				password_confirm: '123456',
			});

		expect(response.status).toBe(400);
	}, 999999);

	it('Quando não é enviado o campo de confirmar senha no corpo da requisição', async () => {
		const { _id: id, username } = await Model.createUser({ password: '123456' });

		const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn: '7d'});

		const response = await request(app)
			.put(`/users/${id}`)
			.set('authorization', `Bearer ${token}`)
			.send({
				name:  faker.name.findName(),
				username: faker.internet.userName(),
				email: faker.internet.email(),
				password: faker.internet.password(),
			});

		expect(response.status).toBe(400);
	}, 999999);
});

describe('Exclusão de Usuário: DELETE /users', () => {
	it('Quando ID informado não existe', async () => {
		const { _id: id, username } = await Model.createUser({ password: '123456' });

		const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn: '7d'});

		const response = await request(app)
			.delete(`/users/6565489879872`)
			.set('authorization', `Bearer ${token}`)

		expect(response.status).toBe(400);
	}, 999999);

	it('Quando exclusão é bem sucedido', async () => {

		const { _id: id, username } = await Model.createUser({ password: '123456' });

		const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {expiresIn: '7d'});

		const response = await request(app)
			.delete(`/users/${id}`)
			.set('authorization', `Bearer ${token}`)

		expect(response.status).toBe(200);
	}, 999999);

	it('Quando não é enviado token na hora de excluir', async () => {
		const { _id: id } = await Model.createUser({ password: '123456' });

		const response = await request(app)
			.delete(`/users/${id}`)

		expect(response.status).toBe(401);
	}, 999999);
})
