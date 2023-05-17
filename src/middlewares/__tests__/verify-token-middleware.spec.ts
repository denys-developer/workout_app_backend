import { TokenTypes } from '@/constants';
import { decodeAuthTokenByType, isTokenExpired } from '@/helpers';
import { verifyTokenMiddleware } from '@/middlewares';
import { getAuthTokenFromHeader } from '@/utils';

describe('verifyTokenMiddleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'Bearer <valid_token>',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should set userId in req object and call next() if token is valid and not expired', () => {
    const token = '<valid_token>';
    const decodedToken = {
      id: 'user_id',
      exp: Date.now() + 3600 * 1000, // 1 hour from now
    };
    const isExpired = false;

    (getAuthTokenFromHeader as jest.Mock).mockReturnValueOnce(token);
    (decodeAuthTokenByType as jest.Mock).mockReturnValueOnce(decodedToken);
    (isTokenExpired as jest.Mock).mockReturnValueOnce(isExpired);

    verifyTokenMiddleware(req, res, next);

    expect(getAuthTokenFromHeader).toHaveBeenCalledWith(req.headers.authorization);
    expect(decodeAuthTokenByType).toHaveBeenCalledWith(token, TokenTypes.AccessToken);
    expect(isTokenExpired).toHaveBeenCalledWith(decodedToken.exp);
    expect(req.userId).toBe(decodedToken.id);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  test('should return 403 status and error message if token is not provided', () => {
    (getAuthTokenFromHeader as jest.Mock).mockReturnValueOnce(null);

    verifyTokenMiddleware(req, res, next);

    expect(getAuthTokenFromHeader).toHaveBeenCalledWith(req.headers.authorization);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token not provided' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 401 status and error message if token is expired', () => {
    const token = '<expired_token>';
    const decodedToken = {
      id: 'user_id',
      exp: Date.now() - 3600 * 1000, // 1 hour ago
    };
    const isExpired = true;

    (getAuthTokenFromHeader as jest.Mock).mockReturnValueOnce(token);
    (decodeAuthTokenByType as jest.Mock).mockReturnValueOnce(decodedToken);
    (isTokenExpired as jest.Mock).mockReturnValueOnce(isExpired);

    verifyTokenMiddleware(req, res, next);

    expect(getAuthTokenFromHeader).toHaveBeenCalledWith(req.headers.authorization);
    expect(decodeAuthTokenByType).toHaveBeenCalledWith(token, TokenTypes.AccessToken);
    expect(isTokenExpired).toHaveBeenCalledWith(decodedToken.exp);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token is expired' });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return 401 status and error message if token is invalid', () => {
    const token = '<invalid_token>';

    (getAuthTokenFromHeader as jest.Mock).mockReturnValueOnce(token);
    (decodeAuthTokenByType as jest.Mock).mockImplementationOnce(() => {
      throw new Error('Invalid token');
    });

    verifyTokenMiddleware(req, res, next);

    expect(getAuthTokenFromHeader).toHaveBeenCalledWith(req.headers.authorization);
    expect(decodeAuthTokenByType).toHaveBeenCalledWith(token, TokenTypes.AccessToken);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });
});
