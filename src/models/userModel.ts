import mongoose from 'mongoose';

const Schema: any = mongoose.Schema;

export const UserSchema: any = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
})