import Guests from '../Guests.mjs';
import { BASE_URI } from '../server.mjs';
import express from 'express';

const router = express.Router();

function createGuestBody (id) {
  if (Guests.exists(id)) {
    return {
      table: Guests.get(id),
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

function createGuestListBody () {
  return {
    guests: Guests.getAll().map(id => {
      return {
        name: Guests.get(id).name,
        href: `${BASE_URI}/guests/${id}`
      };
    }),
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

// guest
router.put('/:id', (request, response) => {
  const id = request.params.id;
  if (!Guests.exists(id)) {
    response.sendStatus(404);
  } else {
    const updatedGuest = request.body;
    Guests.update(id, updatedGuest.name, updatedGuest.children,
      updatedGuest.status);
    response.json(createGuestBody(id));
  }
});

router.delete('/:id', (request, response) => {
  const id = request.params.id;
  if (!Guests.exists(id)) {
    response.sendStatus(404);
  } else {
    Guests.delete(id);
    response.json(createGuestListBody());
  }
});

// guests
router.get('/', (request, response) => {
  response.json(createGuestListBody());
});

router.post('/', (request, response) => {
  const newGuest = request.body;
  if (!(newGuest.name && newGuest.children && newGuest.status)) {
    response.sendStatus(400);
  } else {
    const id = Guests.create(newGuest.name, newGuest.children, newGuest.status);
    response.location(`${BASE_URI}/guests/${id}`).status(201)
      .json(createGuestBody(id));
  }
});

export default router;
