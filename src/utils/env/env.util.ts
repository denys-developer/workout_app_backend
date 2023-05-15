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
    tokens: {
      refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || '',
      accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || '',
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
