import * as process from 'process';

import type { IEnv } from './env.type';

const mapEnv = () => {
  const parsed: IEnv = {
    mongo: {
      db: process.env.MONGO_DB || '',
    },
    app: {
      port: process.env.APP_PORT || '',
      client: process.env.CLIENT_URL || '',
    },
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET || '',
    google: {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    firebase: {
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
    },
    workout: {
      apiToken: process.env.WORKOUT_API_TOKEN || '',
      api: process.env.WORKOUT_API || '',
    },
  };

  return Object.freeze(parsed);
};

let env: IEnv;
export const getEnv = (): Readonly<IEnv> => {
  if (!env) {
    env = mapEnv();
  }
  return env;
};
