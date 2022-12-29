const tables = {};
let nextId = 0;

function create (seat_count, seats, opposite) {
  tables[nextId] = ({
    seat_count: seat_count,
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

function update (id, seat_count, seats, opposite) {
  if (exists(id)) {
    const table = tables[id];
    table.seat_count = seat_count;
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
