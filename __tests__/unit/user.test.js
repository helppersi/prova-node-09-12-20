const bcrypt = require('bcryptjs');

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

describe('Criptografia de Senhas: /users', () => {
	it('Encriptando senha na criação do usuário', async () => {
		const user = await Model.createUser({ password: '123456' });

		const hashCompare = await bcrypt.compare('123456', user.password);

		expect(hashCompare).toBe(true);
	}, 999999);

	it('Encriptando Senha ao atualizar o usuário', async () => {
		const { _id: id } = await Model.createUser({ password: '123456' });

		const userUpdated = await Model.updateUser({ password: '123123' }, id);

		const hashCompare = await bcrypt.compare('123123', userUpdated.password);

		expect(hashCompare).toBe(true);
	}, 999999);
});
