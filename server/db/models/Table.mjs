import { Schema, model } from 'mongoose';

const table = new Schema({
  seatCount: { type: Number, min: 1 },
  opposite: { type: Boolean },
  seats: { type: [Schema.Types.ObjectId], ref: 'guest' }
});

export default model('table', table);
