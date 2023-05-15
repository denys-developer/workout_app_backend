import jwt from 'jsonwebtoken';

import { TokenTypes } from '@/constants';
import { envUtil } from '@/utils';

const {
  tokens: { accessTokenSecret, refreshTokenSecret },
} = envUtil.getEnv();

const getAuthTokenSecretByType = (tokenType: TokenTypes) =>
  tokenType === TokenTypes.AccessToken ? accessTokenSecret : refreshTokenSecret;

export const decodeAuthTokenByType = (token, tokenType: TokenTypes) => {
  const tokenSecret = getAuthTokenSecretByType(tokenType);
  return jwt.verify(token, tokenSecret) as { id: string };
};

export const generateAuthTokenByType = (id, tokenType: TokenTypes) => {
  const isAccess = tokenType === TokenTypes.AccessToken;
  const tokenSecret = getAuthTokenSecretByType(tokenType);
  const options = isAccess ? { expiresIn: '1d' } : {};

  return jwt.sign({ id }, tokenSecret, options);
};

export const generateAuthTokens = (userId: string) => {
  const id = userId.toString();

  const jwtAccessToken = generateAuthTokenByType(id, TokenTypes.AccessToken);
  const jwtRefreshToken = generateAuthTokenByType(id, TokenTypes.RefreshToken);

  return { jwtAccessToken, jwtRefreshToken };
};
