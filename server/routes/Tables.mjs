import * as Tables from '../Tables.mjs';
import { BASE_URI } from '../server.mjs';
import express from 'express';
const router = express.Router();

async function createTablesBody (arr) {
  return Promise.all(arr.map(async o => {
    return {
      name: (await Tables.get(o._id.toString())).name,
      href: `${BASE_URI}/tables/${o._id.toString()}`
    };
  }));
}

async function createTableListBody () {
  const arr = await Tables.getAll();
  return {
    tables: await createTablesBody(arr),
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

async function createTableBody (id) {
  if (await Tables.exists(id)) {
    return {
      table: await Tables.get(id),
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
  } else {
    return null;
  }
}

// tables
router.get('/', async (request, response) => {
  response.json(await createTableListBody());
});

router.post('/', async (request, response) => {
  const newTable = request.body;
  if (!(newTable.seat_count && newTable.seats && newTable.opposite)) {
    response.sendStatus(400);
  } else {
    const id = Tables.create(newTable.seat_count, newTable.seats, newTable.opposite);
    response.location(`${BASE_URI}/tables/${id}`).status(201)
      .json(createTableListBody(id));
  }
});

// table
router.get('/:id', async (request, response) => {
  const id = request.params.id;
  if (!Tables.exists(id)) {
    response.sendStatus(404);
  } else {
    response.json(await createTableBody(id));
  }
});

router.put('/:id', (request, response) => {
  const id = request.params.id;
  if (!Tables.exists(id)) {
    response.sendStatus(404);
  } else {
    const updatedTable = request.body;
    Tables.update(id, updatedTable.seat_count, updatedTable.seats, updatedTable.opposite);
    response.json(createTableBody(id));
  }
});

export default router;
