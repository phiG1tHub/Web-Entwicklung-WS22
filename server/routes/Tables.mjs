import * as Tables from '../controllers/Tables.mjs';
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
  console.log('here');
  response.json(await createTableListBody());
});

router.post('/', async (request, response) => {
  const newTable = request.body;
  if (!(newTable.seatCount && newTable.opposite)) {
    response.sendStatus(400);
  } else {
    const id = Tables.create(newTable.seatCount, newTable.opposite, newTable.seats);
    response.location(`${BASE_URI}/tables/${id}`).status(201)
      .json(await createTableListBody(id));
  }
});

// table
router.get('/:id', async (request, response) => {
  const id = request.params.id;
  if (!await Tables.exists(id)) {
    response.sendStatus(404);
  } else {
    response.json(await createTableBody(id));
  }
});

router.put('/:id', async (request, response) => {
  const id = request.params.id;
  if (!await Tables.exists(id)) {
    response.sendStatus(404);
  } else {
    const updatedTable = request.body;
    try {
      await Tables.update(id, updatedTable.seatCount, updatedTable.opposite, updatedTable.seats);
    } catch (err) {
      console.log(err);
    }
    response.json(await createTableBody(id));
  }
});

export default router;
