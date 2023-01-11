import { Schema, model } from 'mongoose';

const guest = new Schema({
  name: { type: String, required: true },
  children: { type: Boolean, required: true },
  status: { type: String, enum: ['unknown', 'invited', 'confirmed', 'rejected'], required: true }
});

export default model('guest', guest);
