import Tables from '../Tables.mjs';
import { BASE_URI } from '../server.mjs';
import express from 'express';
const router = express.Router();

function createTableListBody () {
  return {
    tables: Tables.getAll().map(id => {
      return {
        name: Tables.get(id).name,
        href: `${BASE_URI}/tables/${id}`
      };
    }),
    _links: {
      self: {
        href: `${BASE_URI}/tables`
      },
      create: {
        method: 'POST',
        href: `${BASE_URI}/tables`
      }
    }
  };
}

function createTableResponse (id) {
  return {
    table: Tables.get(id),
    _links: {
      self: {
        href: `${BASE_URI}/tables/${id}`
      },
      update: {
        method: 'PUT',
        href: `${BASE_URI}/tables/${id}`
      },
      delete: {
        method: 'DELETE',
        href: `${BASE_URI}/tables/${id}`
      },
      list: {
        href: `${BASE_URI}/tables`
      }
    }
  };
}

// table
router.get('/:id', (request, response) => {
  const id = request.params.id;
  if (!Tables.exists(id)) {
    response.sendStatus(404);
  } else {
    response.json(createTableResponse(id));
  }
});

router.put('/:id', (request, response) => {
  const id = request.params.id;
  if (!Tables.exists(id)) {
    response.sendStatus(404);
  } else {
    const updatedTable = request.body;
    Tables.update(id, updatedTable.seat_count, updatedTable.seats, updatedTable.opposite);
    response.json(createTableResponse(id));
  }
});

// tables
router.post('/', (request, response) => {
  const newTable = request.body;
  if (!(newTable.seat_count && newTable.seats && newTable.opposite)) {
    response.sendStatus(400);
  } else {
    const id = Tables.create(newTable.seat_count, newTable.seats, newTable.opposite);
    response.location(`${BASE_URI}/tables/${id}`).status(201)
      .json(createTableListBody(id));
  }
});

router.get('/', (request, response) => {
  response.json(createTableListBody());
});

export default router;
