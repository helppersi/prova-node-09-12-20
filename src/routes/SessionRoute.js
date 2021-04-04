const { Router } = require('express');

const SessionController = require('../controllers/SessionController');

const SessionRoute = new Router();

/*	ROTAS DE CONTAS/AUTENTICAÇÃO  */
SessionRoute.post('/sessions', SessionController.store);

module.exports = SessionRoute;
