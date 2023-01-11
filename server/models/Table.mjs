import { Schema, model } from 'mongoose';

const table = new Schema({
  seatCount: { type: Number, min: 1, required: true },
  opposite: { type: Boolean, required: true },
  seats: { type: [Schema.Types.ObjectId], ref: 'guest' }
});

export default model('table', table);
