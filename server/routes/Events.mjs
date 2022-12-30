import Events from '../Events.mjs';
import { BASE_URI } from '../server.mjs';
import express from 'express';
const router = express.Router();

function createEventListBody () {
  return {
    guests: Events.getAll().map(id => {
      return {
        name: Events.get(id).name,
        href: `${BASE_URI}/events/${id}`
      };
    }),
    _links: {
      self: {
        href: `${BASE_URI}/events`
      },
      create: {
        method: 'POST',
        href: `${BASE_URI}/events`
      }
    }
  };
}

function createEventBody (id) {
  if (Events.exists(id)) {
    return {
      table: Events.get(id),
      _links: {
        self: {
          href: `${BASE_URI}/events/${id}`
        },
        update: {
          method: 'PUT',
          href: `${BASE_URI}/events/${id}`
        },
        delete: {
          method: 'DELETE',
          href: `${BASE_URI}/events/${id}`
        },
        list: {
          href: `${BASE_URI}/events`
        }
      }
    };
  } else {
    return null;
  }
}

// events
router.get('/', (request, response) => {
  response.json(createEventListBody());
});

router.post('/', (request, response) => {
  const newEvent = request.body;
  if (!(newEvent.name && newEvent.start && newEvent.guest_list && newEvent.seating_plan)) {
    response.sendStatus(400);
  } else {
    const id = Events.create(newEvent.name, newEvent.start, newEvent.guest_list, newEvent.seating_plan);
    response.location(`${BASE_URI}/events/${id}`).status(201)
      .json(createEventBody(id));
  }
});

// event
router.get('/:id', (request, response) => {
  const id = request.params.id;
  if (!Events.exists(id)) {
    response.sendStatus(404);
  } else {
    response.json(createEventBody(id));
  }
});

router.delete('/:id', (request, response) => {
  const id = request.params.id;
  if (!Events.exists(id)) {
    response.sendStatus(404);
  } else {
    Events.delete(id);
    response.json(createEventListBody());
  }
});

router.put('/:id', (request, response) => {
  const id = request.params.id;
  if (!Events.exists(id)) {
    response.sendStatus(404);
  } else {
    const updatedEvent = request.body;
    Events.update(id, updatedEvent.name, updatedEvent.start,
      updatedEvent.guest_list, updatedEvent.seating_plan);
    response.json(createEventBody(id));
  }
});

export default router;
