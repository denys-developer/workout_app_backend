import type { IEnv } from './env.type';

const mapEnv = () => {
  const parsed: IEnv = {
    mongo: {
      userName: process.env.MONGO_USERNAME || '',
      password: process.env.MONGO_PASSWORD || '',
      hostName: process.env.MONGO_HOSTNAME || '',
      port: process.env.MONGO_PORT || '',
      db: process.env.MONGO_DB || '',
      authSource: process.env.MONGO_AUTH_SOURCE || '',
    },
    app: {
      port: process.env.APP_PORT || '',
      client: process.env.CLIENT_URL || '',
    },
    jwt: {
      jwtAccessSecret: process.env.JWT_ACCESS_SECRET || '',
      jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || '',
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
