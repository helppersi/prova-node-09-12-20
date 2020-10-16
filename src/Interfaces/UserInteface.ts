import { Schema, model, Document } from 'mongoose';

interface UserInterface extends Document {
  email: string;
  name: string;
  usermane: string;
}

export default UserInterface;
