import bcrypt from 'bcrypt';
import { Schema, model, models } from 'mongoose';

const User = new Schema({
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

User.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default models.User || model('User', User);
