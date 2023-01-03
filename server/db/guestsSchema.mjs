import { Schema } from 'mongoose';

const guestsSchema = new Schema({
  name: { type: String },
  children: { type: Boolean },
  status: { type: String, enum: ['unknown', 'invited', 'confirmed', 'rejected'] }

});

export default guestsSchema;
