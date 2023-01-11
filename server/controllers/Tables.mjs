import table from '../models/Table.mjs';
import mongoose from 'mongoose';

async function create (seatCount, opposite, seats) {
  return await table.create({ seatCount, opposite, seats }).then(
    table => {
      return table;
    }
  ).catch(error => console.log(error.message));
}

async function getAll () {
  const documents = [];
  for await (const doc of table.find()) {
    documents.push(doc);
  }
  return documents;
}

async function get (id) {
  let document;
  for await (const doc of table.findById(id)) {
    document = doc;
  }
  return document;
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

export { create, getAll, get, update, remove, exists };
