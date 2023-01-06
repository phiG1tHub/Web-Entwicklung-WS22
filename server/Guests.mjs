import guest from './db/models/Guest.mjs';
import mongoose from 'mongoose';

async function create (name, children, status) {
  return document = await guest.create({name, children, status}).then(
    guest => {
      return guest;
    }
  ).catch(error => console.log(error.message));
}

async function getAll () {
  const arr2 = [];
  for await (const doc of guest.find()) {
    arr2.push(doc);
  }
  return arr2;
}

async function get (id) {
  let c;
  for await (const doc of guest.findById(id)) {
    c = doc;
  }
  return c;
}

async function update (id, name, children, status) {
  const doc = await guest.findById(id);
  doc.name = name;
  doc.children = children;
  doc.status = status;
  await doc.save();
}

async function remove (id) {
  return guest.remove(mongoose.Types.ObjectId(id));
}

async function exists (id) {
  return guest.exists(mongoose.Types.ObjectId(id));
}

export default { create, getAll, get, update, remove, exists };
