import table from './db/models/Table.mjs';
import mongoose from 'mongoose';

async function create (seatCount, opposite, seats) {
  return document = await table.create({seat_count, opposite, seats}).then(
    table => {
      return table;
    }
  ).catch(error => console.log(error.message));
}

async function getAll () {
  const arr2 = [];
  for await (const doc of table.find()) {
    arr2.push(doc);
  }
  return arr2;
}

async function get (id) {
  let c;
  for await (const doc of table.findById(id)) {
    c = doc;
  }
  return c;
}

async function update (id, seatCount, opposite, seats) {
  const doc = await table.findById(id);
  doc.seatCount = seatCount;
  doc.opposite = opposite;
  doc.seats = seats;
  await doc.save();
}

async function remove (id) {
  return table.remove(mongoose.Types.ObjectId(id));
}

async function exists (id) {
  return table.exists(mongoose.Types.ObjectId(id));
}

export default { create, getAll, get, update, remove, exists };