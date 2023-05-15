import * as validator from 'validator';

import { TokenTypes } from '@/constants';
import { decodeAuthTokenByType, generateAuthTokenByType, generateAuthTokens } from '@/helpers';
import { UserModel } from '@/models';
import { envUtil } from '@/utils';

const {
  app: { client },
  tokens: { accessTokenSecret, refreshTokenSecret },
} = envUtil.getEnv();

class AuthController {
  async signUp(req, res, next) {
    try {
      const { email, password } = req.body;
      const existUser = await UserModel.findOne({ email });
      if (!validator.isEmail(email)) {
        return res.status(400).send({ error: 'Invalid email address!' });
      }
      if (existUser) return res.status(401).json({ message: 'User is exist!' });

      const user = new UserModel({ email, password });
      user.save();
      res.send({ message: 'User was created successfully!' });
    } catch (e) {
      next(e);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      try {
        const { id } = decodeAuthTokenByType(refreshToken, TokenTypes.RefreshToken);
        const accessToken = generateAuthTokenByType(id, TokenTypes.AccessToken);
        res.json({ accessToken });
      } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
      }
    } catch (e) {
      next(e);
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user) return res.status(401).json({ message: 'Authentication failed.' });
      const match = await user.comparePassword(password);
      if (!match) return res.status(401).json({ message: 'Authentication failed.' });

      const tokens = generateAuthTokens(user._id);

      res.status(200).json({ message: 'Login successful', ...tokens });
    } catch (e) {
      next(e);
    }
  }

  googleAuthCallback(req, res, next) {
    try {
      const { jwtAccessToken, jwtRefreshToken } = req?.user;
      res.redirect(`${client}/google-auth/${jwtAccessToken}/${jwtRefreshToken}`);
    } catch (e) {
      next(e);
    }
  }
}

export default new AuthController();
