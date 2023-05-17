import { TokenTypes } from '@/constants';
import { decodeAuthTokenByType, isTokenExpired } from '@/helpers';
import { getAuthTokenFromHeader } from '@/utils';

export const verifyTokenMiddleware = (req, res, next) => {
  try {
    const token = getAuthTokenFromHeader(req.headers.authorization);
    if (!token) {
      return res.status(403).json({ message: 'Token not provided' });
    }
    const { id, exp } = decodeAuthTokenByType(token, TokenTypes.AccessToken);

    const isExpired = isTokenExpired(exp);

    if (isExpired) {
      return res.status(401).json({ message: 'Token is expired' });
    }
    req.userId = id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
