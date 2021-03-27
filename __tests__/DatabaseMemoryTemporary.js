const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// const server = new MongoMemoryServer();

class DatabaseMemoryTemporary {
	async connect() {
		const server = new MongoMemoryServer();

		const url = await server.getUri();

		mongoose.connect(url, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
		});
	}

	async disconnect() {
		await mongoose.connection.close();
	}
}

module.exports = new DatabaseMemoryTemporary();
