const request = require('supertest');
const jwt = require('jsonwebtoken');

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

describe('Autenticação: /sessions', () => {
	it('Autenticação bem sucedida quando as credenciais forem válidas', async () => {
		const user = await Model.createUser({ password: '123456' });

		const response = await request(app)
			.post('/sessions')
			.send({
				email: user.email,
				password: '123456'
			});

		expect(response.status).toBe(200);
	}, 999999);

	it('Falha na autenticação quando o email for inválido', async () => {
		await Model.createUser({ password: '123456' });

		const response = await request(app)
			.post('/sessions')
			.send({
				email: `${Date.now}@gmail.com`,
				password: '123456'
			});

		expect(response.status).toBe(400);
	}, 999999);

	it('Falha na autenticação quando a senha for inválida', async () => {
		const user = await Model.createUser({ password: '123456' });

		const response = await request(app)
			.post('/sessions')
			.send({
				email: user.email,
				password: '123'
			});

		expect(response.status).toBe(401);
	}, 999999);

	it('Falha na autenticação quando email e senha não forem válidos', async () => {

		const response = await request(app)
			.post('/sessions')
			.send({
				email: 'raifreelas@gmail.com',
				password: '123'
			});

		expect(response.status).toBe(401);
	}, 999999);

	it('Retorno de um token quando as credenciais forem válidas', async () => {

		const user = await Model.createUser({ password: '123456' });

		const response = await request(app)
			.post('/sessions')
			.send({
				email: user.email,
				password: '123456'
			});

		expect(response.body).toHaveProperty('token');
	}, 999999);
});
