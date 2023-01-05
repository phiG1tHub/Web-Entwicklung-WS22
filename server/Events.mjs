import event from './db/models/Event.mjs';
import mongoose from 'mongoose';

async function create (name, start, guestList, seatingPlan,
  tableCount) {
  return document = await event.create({ name, start, guestList, seatingPlan, tableCount }).then(
    event => {
      return event;
    }
  ).catch(error => console.log(error.message));

}

async function getAll () {
  const arr2 = [];
  for await (const doc of event.find()) {
    arr2.push(doc);// Prints documents one at a time
  }
  return arr2;
}

async function get (id) {
  let c;
  for await (const doc of event.findById(id)) {
    c = doc;
  }
  return c;
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
