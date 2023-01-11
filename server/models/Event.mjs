import { Schema, model } from 'mongoose';

const event = new Schema({
  name: { type: String },
  start: { type: Date, min: Date.now() },
  guestList: { type: [Schema.Types.ObjectId], ref: 'guest' },
  seatingPlan: { type: [Schema.Types.ObjectId], ref: 'table' },
});

export default model('event', event);
