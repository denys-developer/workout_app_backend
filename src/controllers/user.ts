import { uploadImageToFirebase } from '@/helpers';
import { UserModel } from '@/models';

class UserController {
  async getActive(req, res, next) {
    try {
      const { userId } = req;

      const user = await UserModel.findById(userId);
      res.send(user);
    } catch (e) {
      next(e);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { userId } = req;
      const picture = req.file;
      const params = { ...req.body };

      if (picture) {
        const pictureUrl = await uploadImageToFirebase(userId, picture);
        params.picture = pictureUrl;
      }
      const user = await UserModel.findByIdAndUpdate(userId, params, {
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
