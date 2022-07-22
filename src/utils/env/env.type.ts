export interface IMongoOptions {
  userName: string;
  password: string;
  hostName: string;
  port: string;
  db: string;
  authSource: string;
}

export interface IAppOptions {
  port: string;
  client: string;
}

export interface IJwtOptions {
  jwtAccessSecret: string;
  jwtRefreshSecret: string;
}

export interface IEnv {
  mongo: IMongoOptions;
  app: IAppOptions;
  jwt: IJwtOptions;
}
