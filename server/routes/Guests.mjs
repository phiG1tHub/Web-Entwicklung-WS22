import * as Guests from '../controllers/Guests.mjs';
import { BASE_URI } from '../server.mjs';
import express from 'express';
const router = express.Router();

async function createGuestsBody (arr) {
  return Promise.all(arr.map(async o => {
    return {
      name: (await Guests.get(o._id.toString())).name,
      href: `${BASE_URI}/guests/${o._id.toString()}`
    };
  }));
}

async function createGuestListBody () {
  const arr = await Guests.getAll();
  return {
    guests: await createGuestsBody(arr),
    _links: {
      self: {
        href: `${BASE_URI}/guests`
      },
      create: {
        method: 'POST',
        href: `${BASE_URI}/guests`
      }
    }
  };
}

async function createGuestBody (id) {
  if (await Guests.exists(id)) {
    return {
      guest: await Guests.get(id),
      _links: {
        self: {
          href: `${BASE_URI}/guests/${id}`
        },
        update: {
          method: 'PUT',
          href: `${BASE_URI}/guests/${id}`
        },
        delete: {
          method: 'DELETE',
          href: `${BASE_URI}/guests/${id}`
        },
        list: {
          href: `${BASE_URI}/guests`
        }
      }
    };
  } else {
    return null;
  }
}

// guests
router.get('/', async (request, response) => {
  response.json(await createGuestListBody());
});

router.post('/', async (request, response) => {
  const newGuest = request.body;
  if (!(newGuest.name && newGuest.children && newGuest.status)) {
    response.sendStatus(400);
  } else {
    const id = await Guests.create(newGuest.name, newGuest.children, newGuest.status);
    console.log(id);
    response.location(`${BASE_URI}/guests/${id}`).status(201)
      .json(await createGuestBody(id));
  }
});

// guest
router.get('/:id', async (request, response) => {
  const id = request.params.id;
  if (!await Guests.exists(id)) {
    response.sendStatus(404);
  } else {
    response.json(await createGuestBody(id));
  }
});

router.put('/:id', async (request, response) => {
  const id = request.params.id;
  if (!await Guests.exists(id)) {
    response.sendStatus(404);
  } else {
    const updatedGuest = request.body;
    try {
      await Guests.update(id, updatedGuest.name, updatedGuest.children,
        updatedGuest.status);
    } catch (err) {
      response.sendStatus(400);
    }
    response.json(await createGuestBody(id));
  }
});

router.delete('/:id', async (request, response) => {
  const id = request.params.id;
  if (!await Guests.exists(id)) {
    response.sendStatus(404);
  } else {
    try {
      await Guests.remove(id);
      response.json(createGuestListBody());
    } catch (err) {
      response.sendStatus(404);
    }
  }
});

export default router;
