
/**
 * DatabaseMemoryTemporary
 *
 * Abre e fecha conexão com Base de Dados
 * Temporária pra Testes
 *
 * @author Raissa Queiroz
 * @since 03/2021
 */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

class DatabaseMemoryTemporary {

	/**
	 * createConnection
	 *
	 * Cria a conexão
	 *
	 * @access public
	 * @author Raissa Queiroz
	 * @since 03/2021
	 */
	async createConnection() {
		const server = new MongoMemoryServer();

		const url = await server.getUri();

		mongoose.connect(url, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});
	}

	/**
	 * disconnect
	 *
	 * Fecha a conexão
	 *
	 * @access public
	 * @author Raissa Queiroz
	 * @since 03/2021
	 */
	async disconnect() {
		await mongoose.connection.close();
	}
}

module.exports = new DatabaseMemoryTemporary();
