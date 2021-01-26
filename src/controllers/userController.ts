import BaseController  from './baseController';
import mongoose from 'mongoose';

//schema
import { UserSchema } from '../models/userModel';


export default class UserController extends BaseController {
    constructor(){
        const User: mongoose.Model<mongoose.Document<any>> 
            = mongoose.model('User', UserSchema);

        super(User);
    }
}