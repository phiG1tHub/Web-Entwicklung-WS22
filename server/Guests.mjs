import guest from './db/models/Guest.mjs';

function create () {
  guest.create();
}

function getAll () {
  // todo
  return null;
}

function get (id) {
  return guest.findById(id);
}

function update (id) {

}

function remove () {

}

function exists () {

}

export default { create, getAll, get, update, remove, exists };
