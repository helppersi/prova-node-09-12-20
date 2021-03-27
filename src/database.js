const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');

require('dotenv').config();

class Database {
	createConnection() {
		mongoose.connect(process.env.MONGO_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});

		this.logger();
	}

	logger() {
		this.dbConnection = mongoose.connection;
		this.dbConnection.on('connected', () =>
			console.log('Mongoose está conectado. ')
		);
		this.dbConnection.on('error', (error) =>
			console.error.bind(console, `Erro na conexão: ${error}`)
		);
	}

	// async connectMongoMemoryServer() {
	// 	const server = new MongoMemoryServer();

	// 	const url = await server.getUri();

	// 	mongoose.connect(url, {
	// 		useUnifiedTopology: true,
	// 		useNewUrlParser: true,
	// 		useCreateIndex: true,
	// 	});
	// }

	// async disconnect() {
	// 	await mongoose.connection.close();
	// }
}

module.exports = new Database();
