import { Schema, model } from 'mongoose';

const event = new Schema({
  name: { type: String },
  start: { type: Date, min: Date.now() },
  guestList: { type: [Schema.Types.ObjectId], ref: 'guest' },
  seatingPlan: { type: [Schema.Types.ObjectId], ref: 'table' },
  tableCount: { type: Number, min: 1 },
  seatsPerTable: { type: Number, min: 1 }
});

export default model('event', event);
