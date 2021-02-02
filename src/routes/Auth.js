const { Router } = require('express');

const AuthController = require('../controllers/AuthController');

const Auth = new Router();

/*	ROTAS DE CONTAS/AUTENTICAÇÃO  */
Auth.post('/sessions', AuthController.store);


module.exports = Auth;
