import { UserModel } from '../models';

export const signUp = async (params) => {
  const user = new UserModel(params);
  return await user.save();
};
