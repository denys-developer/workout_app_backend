import jwt, { JwtPayload } from 'jsonwebtoken';

import { uploadImageToFirebase } from '@/helpers';
import { UserModel } from '@/models';
import { envUtil } from '@/utils';

const { jwtAccessSecret } = envUtil.getEnv();

class UserController {
  async getActive(req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(' ')[1];
      const { id } = jwt.verify(token, jwtAccessSecret) as JwtPayload;
      const user = await UserModel.findById(id);
      res.send(user);
    } catch (e) {
      next(e);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const picture = req.file;
      const params = { ...req.body };

      if (picture) {
        const pictureUrl = await uploadImageToFirebase(id, picture);
        params.picture = pictureUrl;
      }
      const user = await UserModel.findByIdAndUpdate(id, params, {
        new: true,
        runValidators: true,
      });
      await user.save();

      res.send(user);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
