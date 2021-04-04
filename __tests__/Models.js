/**
 * Models
 *
 * Dados Genéricos na Base de Dados
 * Temporaria para testes
 *
 * @author Raissa Queiroz
 * @since 03/2021
 */

const faker = require('faker');

const User = require('../src/models/User');

class Models {
	/**
	 * createUser
	 *
	 * Cria usuário genérico
	 *
	 * @author Raissa Queiroz
	 * @since 03/2021
	 * @param object
	 * @return object
	 */
	async createUser(payload = {}){

		const response = await User.create({
			name:  faker.name.findName(),
			username: faker.internet.userName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			...payload
		});

		return response;

	}
	/**
	 * createUserWithoutUsername
	 *
	 * Cria usuário genérico sem nome de usuário
	 *
	 * @author Raissa Queiroz
	 * @since 03/2021
	 * @param object
	 * @return object
	 */
	async createUserWithoutUsername(payload = {}){

		const response = await User.create({
			name:  faker.name.findName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			...payload
		});

		return response;

	}

	/**
	 * updateUser
	 *
	 * Atualiza dados do usuário
	 * criado genéricamente
	 *
	 * @author Raissa Queiroz
	 * @since 03/2021
	 * @param object payload
	 * @param string id
	 * @return object
	 */
	async updateUser(payload, id){
		// Atualizando usuário genérico
		const response = await User.findOneAndUpdate( { _id: id }, payload, { new: true } );

		return response;
	}

}

module.exports = new Models();
