import express from 'express';
import path from 'path';

const dirname = path.dirname(process.argv[1]);
const host = 'localhost';

const server = express();

server.use(express.static(path.join(dirname, '../dist/')));

server.get('/*', (request, response) => {
  response.sendFile(path.join(dirname, '../dist/index.html'));
});

// grabbing the port from the commandline or setting 8080 as default

let port = process.argv.slice(2)[0];

if (port == null) {
  port = 8080;
} else {
  port = parseInt(port);
}

// setup RESTful HTTP API
const BASE_URI = `http://localhost:${port}/api`;
server.use(bodyParser.json());

const Guests = require("./Guests");
const Tables = require("./Tables");


// listening for requests
server.listen(port, host, () => { console.log('Server is running on http://' + host + ':' + port); });

// entrypoint
server.get("/api/", (request, response) => {
  response.json({
    _links: {
      self: { href: `${BASE_URI}` },
      events: { href: `${BASE_URI}/events` },
      guests: { href: `${BASE_URI}/guests` },
      tables: { href: `${BASE_URI}/tables` }
    }
  });
});

// guests
server.get("/api/guests", (request, response) => { 
  response.json(createGuestListBody ());
  });

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

// table
server.get("/tables/:id", (request, response) => {
  const id = request.params.id;
  if (!Tables.exists(id)) {
    response.sendStatus(404);
  }
  else {
    response.json(createTableBody(id));
  }
});

function createTableResponse (id) {
  if (Tables.exists(id)) {
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
        list: {
          href: `${BASE_URI}/tables`
        }
      }
    };
  } else {
    return null;
  }
}

server.put("/tables/:id", (request, response) => {
  const id = request.params.id;
  if (!Tables.exists(id)) {
    response.sendStatus(404);
  }
  else {
    const updatedTable = request.body;
    Tables.update(id, updatedTable.seat_count, updatedTable.seats, updatedTable.opposite);
  response.json(createTableBody(id));
  }
});

server.post("/tables", (request, response) => {
  const newTable = request.body;
  if (!(newTable.seat_count && newTable.seats && newTable.opposite)) {
    response.sendStatus(400);
  }
  else {
    const id = Tables.create(newTable.seat_count, newTable.seats, newTable.opposite);
    response.location(`${BASE_URI}/tables/${id}`).status(201)
      .json(createCustomerBody(id));
  }
});

// tables
server.get("/api/tables", (request, response) => { 
  response.json(createTableListBody ());
  });

function createTableListBody () {
  return {
    tables: Table.getAll().map(id => {
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