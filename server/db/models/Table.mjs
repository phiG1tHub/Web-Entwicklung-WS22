import { Schema, model } from 'mongoose';

const table = new Schema({
  seat_count: { type: Number, min: 1 },
  start: { type: Date, min: Date.now() },
  opposite: { type: Boolean },
  seats: { type: [Schema.Types.ObjectId], ref: 'guest' }
});

export default model('table', table);
