import { Schema, model } from 'mongoose';
import UserInterface from '../Interfaces/UserInteface';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default model<UserInterface>('User', UserSchema);
