import bcrypt from 'bcrypt';
import { Schema, model, models } from 'mongoose';
import * as validator from 'validator';

const User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    unique: true,
  },
  googleId: {
    type: String,
    default: null,
    required: false,
  },
  picture: {
    type: String,
  },
});

User.methods.comparePassword = async function (password) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};

User.pre('save', async function () {
  const user = this;

  if (!user.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
});

export default models.User || model('User', User);
