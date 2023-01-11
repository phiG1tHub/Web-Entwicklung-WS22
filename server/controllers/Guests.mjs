import guest from '../models/Guest.mjs';
import mongoose from 'mongoose';

async function create (name, children, status) {
  const document = await guest.create({ name, children, status }).then(
    guest => {
      return guest;
    }
  ).catch(error => console.log(error.message));

  return document._id.toString();
}

async function getAll () {
  const documents = [];
  for await (const doc of guest.find()) {
    documents.push(doc);
  }
  return documents;
}

async function get (id) {
  try {
    const guestDoc = await guest.findById(mongoose.Types.ObjectId(id));
    if (!guestDoc) {
      return 'Guest not found';
    }
    return guestDoc;
  } catch (err) {
    console.log(err);
  }
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

export { create, getAll, get, update, remove, exists };
