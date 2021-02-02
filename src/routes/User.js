const { Router } = require('express');

const authMiddleware = require('../middlewares/auth');

const UserController = require('../controllers/UserController');

const User = new Router();

/*	ROTAS DE USUÁRIOS  */
User.post('/users', UserController.store);
User.get('/users', authMiddleware, UserController.index);
User.put('/users/:user_id', authMiddleware, UserController.update);
User.delete('/users/:user_id', authMiddleware, UserController.destroy);

module.exports = User;
