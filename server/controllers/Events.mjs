import event from '../models/Event.mjs';
import mongoose from 'mongoose';

async function create (name, start, guestList, seatingPlan,
  tableCount) {
  return await event.create({ name, start, guestList, seatingPlan, tableCount }).then(
    event => {
      return event;
    }
  ).catch(error => console.log(error.message));
}

async function getAll () {
  const documents = [];
  for await (const doc of event.find()) {
    documents.push(doc);// Prints documents one at a time
  }
  return documents;
}

async function get (id) {
  let document;
  for await (const doc of event.findById(id)) {
    document = doc;
  }
  return document;
}

async function update (id, name, start,
  guestList, seatingPlan) {
  const doc = await event.findById(id);
  doc.name = name;
  doc.start = start;
  doc.guestList = guestList;
  doc.seatingPlan = seatingPlan;
  await doc.save();
}

async function remove (id) {
  return event.remove(mongoose.Types.ObjectId(id));
}

async function exists (id) {
  return event.exists(mongoose.Types.ObjectId(id));
}

export { create, getAll, get, update, remove, exists };
