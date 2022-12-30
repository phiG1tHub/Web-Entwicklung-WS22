import Guests from '../Guests.mjs';
import { BASE_URI } from '../server.mjs';
const express = require('express');

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
router.put('/api/guests/:id', (request, response) => {
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

router.delete('/api/events/:id', (request, response) => {
  const id = request.params.id;
  if (!Guests.exists(id)) {
    response.sendStatus(404);
  } else {
    Guests.delete(id);
    response.json(createGuestListBody());
  }
});

// guests
router.get('/api/guests', (request, response) => {
  response.json(createGuestListBody());
});

router.post('/api/guests', (request, response) => {
  const newGuest = request.body;
  if (!(newGuest.name && newGuest.children && newGuest.status)) {
    response.sendStatus(400);
  } else {
    const id = Guests.create(newGuest.name, newGuest.children, newGuest.status);
    response.location(`${BASE_URI}/guests/${id}`).status(201)
      .json(createGuestBody(id));
  }
});

module.exports = router;
