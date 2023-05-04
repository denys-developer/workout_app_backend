import jwt from 'jsonwebtoken';

import { UserModel } from '@/models';
import { envUtil } from '@/utils';

const {
  app: { client },
  jwtAccessSecret,
} = envUtil.getEnv();

class UserController {
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

  async updateUser(req, res, next) {
    try {
      const picture = req.file;
      console.log(picture);
      res.send({ picture });
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
