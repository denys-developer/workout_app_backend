export interface IMongoOptions {
  db: string;
}

export interface IAppOptions {
  port: string;
  client: string;
}

export interface IGoogleOptions {
  clientID: string;
  clientSecret: string;
}

export interface IEnv {
  mongo: IMongoOptions;
  app: IAppOptions;
  google: IGoogleOptions;
  jwtAccessSecret: string;
}
