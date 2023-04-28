import mongoose from 'mongoose';

import { envUtil } from '@/utils';

const {
  mongo: { db },
} = envUtil.getEnv();
try {
  mongoose.connect(db);
} catch (err) {
  console.log(err);
}
