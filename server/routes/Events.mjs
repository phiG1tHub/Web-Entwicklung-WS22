import * as Events from '../controllers/Events.mjs';
import { BASE_URI } from '../server.mjs';
import express from 'express';
const router = express.Router();

async function createEventsBody (arr) {
  return Promise.all(arr.map(async o => {
    return {
      name: (await Events.get(o._id.toString())).name,
      href: `${BASE_URI}/events/${o._id.toString()}`
    };
  }));
}

async function createEventListBody () {
  const arr = await Events.getAll();
  return {
    events: await createEventsBody(arr),
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

async function createEventBody (id) {
  if (await Events.exists(id)) {
    return {
      event: await Events.get(id),
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
router.get('/', async (request, response) => {
  response.json(await createEventListBody());
});

router.post('/', async (request, response) => {
  const newEvent = request.body;
  // console.log(newEvent)
  if (!(newEvent.name && newEvent.start && newEvent.guest_list && newEvent.seating_plan && newEvent.tableCount)) {
    // console.log('here');
    response.sendStatus(400);
  } else {
    const id = Events.create(newEvent.name, newEvent.start, newEvent.guest_list, newEvent.seating_plan,
      newEvent.tableCount);
    console.log('should have worked');
    console.log(await createEventBody(id));
    response.location(`${BASE_URI}/events/${id}`).status(201)
      .json(createEventBody(id));
  }
});

// event
router.get('/:id', async (request, response) => {
  const id = request.params.id;
  if (!await Events.exists(id)) {
    response.sendStatus(404);
  } else {
    response.json(await createEventBody(id));
  }
});

router.delete('/:id', async (request, response) => {
  const id = request.params.id;
  if (!await Events.exists(id)) {
    response.sendStatus(404);
  } else {
    await Events.remove(id);
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
      updatedEvent.guestList, updatedEvent.seatingPlan);
    response.json(createEventBody(id));
  }
});

export default router;
