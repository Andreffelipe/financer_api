import mongoose from '../mongo';
import { Schema } from 'mongoose';

const UserSchema = new Schema({
  firstName: String,
  email: {
    type: String,
    index: true,
    unique: true
  },
  password: String,
});

export default mongoose.model('User', UserSchema);
