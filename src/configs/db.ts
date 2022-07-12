import mongoose from 'mongoose';
import { envUtil } from '../utils';

const {
  mongo: { userName, password, hostName, port, db, authSource },
} = envUtil.getEnv();

const url = `mongodb://${userName}:${password}@${hostName}:${port}/${db}?authSource=${authSource}`;

try {
  mongoose.connect(url);
} catch (err) {
  console.log(err);
}
