import { Schema, model, models } from 'mongoose';

const Exercise = new Schema({
  title: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  video: {
    type: String,
  },
  externalId: {
    type: String,
    unique: true,
    required: true,
  },
  duration: {
    type: Number,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  prevExternalId: { type: String, required: false },
  nextExternalId: { type: String, required: false },
});

export default models.Exercise || model('Exercise', Exercise);
