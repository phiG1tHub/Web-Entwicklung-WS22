import { Schema } from 'mongoose';

const tablesSchema = new Schema({
  seat_count: { type: Number, min: 0 },
  start: { type: Date, min: Date.now() },
  opposite: { type: Boolean }
});

export default tablesSchema;
