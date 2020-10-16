import { Router } from 'express';
import UserController from '../Controllers/UserController';

const UserRouter = Router();

UserRouter.get('/users', UserController.index);
UserRouter.post('/users', UserController.create);
UserRouter.put('/users/:id', UserController.update);
UserRouter.delete('/users/:id', UserController.delete);

export default UserRouter;
