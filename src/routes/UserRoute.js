const { Router } = require('express');

const authMiddleware = require('../middlewares/auth');

const UserController = require('../controllers/UserController');

const UserRoute = new Router();

/*	ROTAS DE USUÁRIOS  */
UserRoute.post('/users', UserController.store);
UserRoute.get('/users', authMiddleware, UserController.index);
UserRoute.get('/users/:user_id', authMiddleware, UserController.show);
UserRoute.put('/users/:user_id', authMiddleware, UserController.update);
UserRoute.delete('/users/:user_id', authMiddleware, UserController.destroy);

module.exports = UserRoute;
