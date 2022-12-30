import express from 'express';
import path from 'path';

import * as bodyParser from 'express';

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
export const BASE_URI = `http://localhost:${port}/api`;

server.use(express.json());
server.use(bodyParser.json());

// entrypoint
server.get('/api/', (request, response) => {
  response.json({
    _links: {
      self: { href: `${BASE_URI}` },
      events: { href: `${BASE_URI}/events` },
      guests: { href: `${BASE_URI}/guests` },
      tables: { href: `${BASE_URI}/tables` }
    }
  });
});

// listening for requests
server.listen(port, host, () => { console.log('Server is running on http://' + host + ':' + port); });
