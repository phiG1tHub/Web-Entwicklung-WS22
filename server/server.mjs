import express from 'express';
import path from 'path';
import * as bodyParser from 'express';
import * as dotenv from 'dotenv';
// db imports
import eventsRoutes from './routes/Events.mjs';
import guestRoutes from './routes/Guests.mjs';
import tablesRoutes from './routes/Tables.mjs';
import mongoose from 'mongoose';
dotenv.config();
// import { db } from './db/conn.mjs';

const dirname = path.dirname(process.argv[1]);
const host = 'localhost';

const server = express();

server.use(express.static(path.join(dirname, '../dist/')));

// grabbing the port from the commandline or setting 8080 as default

let port = process.argv.slice(2)[0];

if (port == null) {
  port = 8080;
} else {
  port = parseInt(port);
}

// setup RESTful HTTP API
export const BASE_URI = `http://localhost:${port}/api`;

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

server.use('/api/events', eventsRoutes);
server.use('/api/guests', guestRoutes);
server.use('/api/tables', tablesRoutes);

server.get('*', (request, response) => {
  response.sendFile(path.join(dirname, '../dist/index.html'));
});

// listening for requests
mongoose.set('strictQuery', false);
// mongoose.Promise = global.Promise;

async function main () {
  await mongoose.connect(process.env.DB_URI,
    () => server.listen(port, host, () => {
      console.log('Server is running on http://' + host + ':' + port);
    }));
}

main().catch(err => console.log(err));
