import { Schema, model } from 'mongoose';

const guest = new Schema({
  name: { type: String },
  children: { type: Boolean },
  status: { type: String, enum: ['unknown', 'invited', 'confirmed', 'rejected'] }
});

export default model('guest', guest);
