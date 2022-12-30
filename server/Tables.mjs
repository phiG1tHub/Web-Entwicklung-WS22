const tables = {};
let nextId = 0;

function create (seatCount, seats, opposite) {
  tables[nextId] = ({
    seatCount: seatCount,
    seats: seats,
    opposite: opposite,
    active: true
  });

  return nextId++;
}

function getAll () {
  return Object.keys(tables).filter(id => { return tables[id].active === true; });
}

function get (id) {
  if (!exists(id)) {
    return null;
  } else {
    const clone = JSON.parse(JSON.stringify(tables[id]));
    delete clone.active;
    return clone;
  }
}

function update (id, seatCount, seats, opposite) {
  if (exists(id)) {
    const table = tables[id];
    table.seatCount = seatCount;
    table.seats = seats;
    table.opposite = opposite;
  }
}

function remove (id) {
  if (exists(id)) {
    tables[id].active = false;
  }
}

function exists (id) {
  return tables[id] && tables[id].active === true;
}

export default { create, getAll, get, update, remove, exists };
