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

export interface IWorkoutApiOptions {
  apiToken: string;
  api: string;
}

export interface IFirebaseOptions {
  storageBucket: string;
}

export interface ITokensOptions {
  refreshTokenSecret: string;
  accessTokenSecret: string;
}

export interface IEnv {
  mongo: IMongoOptions;
  app: IAppOptions;
  google: IGoogleOptions;
  workout: IWorkoutApiOptions;
  firebase: IFirebaseOptions;
  tokens: ITokensOptions;
}
