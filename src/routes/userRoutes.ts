import BaseRouter from './baseRoutes';
import UserController from '../controllers/userController'

export default class UserRoutes extends BaseRouter{

    constructor(){
        const controller: UserController = new UserController();
        const route: string = '/user';

        super(new UserController(), route);
    }
}