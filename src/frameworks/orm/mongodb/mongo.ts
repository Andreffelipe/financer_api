import mongoose from 'mongoose';
import { configApp } from '../../../config/config';

console.log(configApp.URL);
mongoose.connect(configApp.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connected to mongo database'));

export default mongoose;
