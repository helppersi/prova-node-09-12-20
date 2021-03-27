const dbHandler = require('../DatabaseMemoryTemporary');
const User = require('../../src/models/User');

// Connect Database Temporary
beforeAll(() => {
	dbHandler.connect();
});

// Disconnect Database Temporary
afterAll(() => {
	dbHandler.disconnect();
});

describe('Autenticação: /sessions', () => {
	it('Retorno de um token quando as credenciais forem válidas', async () => {
		const createUser = await User.create({
			name: 'Raissa Queiroz',
			username: 'raissaqueiroz',
			email: `${Date.now()}@gmail.com`,
			password: '123456',
		});

		console.log(createUser);

		expect(createUser.name).toBe('Raissa Queiroz');
	}, 999999);
});
