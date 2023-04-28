import jwt from 'jsonwebtoken';
import * as validator from 'validator';

import { UserModel } from '@/models';
import { envUtil } from '@/utils';

const {
  app: { client },
  jwtAccessSecret,
} = envUtil.getEnv();

class UserController {
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
      res.send({});
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
      const id = user._id.toString();
      const token = jwt.sign({ id }, jwtAccessSecret);
      res.send({ token });
    } catch (e) {
      next(e);
    }
  }

  async getActive(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];
      const { id } = jwt.verify(token, jwtAccessSecret);
      const user = await UserModel.findById(id);
      res.send(user);
    } catch (e) {
      next(e);
    }
  }

  googleAuthCallback(req, res, next) {
    try {
      const token = req?.user;
      res.redirect(`${client}/google-auth/${token}`);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
