const guests = {};
let nextId = 0;

function create (name, children, status) {
  guests[nextId] = ({
    name: name,
    children: children,
    status: status,
    active: true
  });

  return nextId++;
}

function getAll () {
  return Object.keys(guests).filter(id => { return guests[id].active === true; });
}

function get (id) {
  if (!exists(id)) {
    return null;
  } else {
    const clone = JSON.parse(JSON.stringify(guests[id]));
    delete clone.active;
    return clone;
  }
}

function update (id, name, children, status) {
  if (exists(id)) {
    const guest = guests[id];
    guest.name = name;
    guest.children = children;
    guest.status = status;
  }
}

function remove (id) {
  if (exists(id)) {
    guests[id].active = false;
  }
}

function exists (id) {
  return guests[id] && guests[id].active === true;
}

export default { create, getAll, get, update, remove, exists };
