import jwt from 'jsonwebtoken';

import { TokenModel } from '@/models';
import { envUtil } from '@/utils';

const {
  jwt: { jwtAccessSecret, jwtRefreshSecret },
} = envUtil.getEnv();

class TokenService {
  public generateTokens(payload) {
    const accessToken = jwt.sign(payload, jwtAccessSecret, { expiresIn: '1d' });
    const refreshToken = jwt.sign(payload, jwtRefreshSecret, { expiresIn: '3d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  public async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }

  public validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, jwtRefreshSecret);
      console.log(userData);
      return userData;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({ refreshToken });
    return tokenData;
  }

  public async removeToken(refreshToken) {
    const tokenData = await TokenModel.deleteOne({ refreshToken });
    return tokenData;
  }
}

export default new TokenService();
