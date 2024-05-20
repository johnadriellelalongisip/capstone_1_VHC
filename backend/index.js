const https = require('https');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const routes = require('./routes/routes');
const initializeWebSocket = require('./sockets/eventDispatcher');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const corsOptions = {
  origin: 'https://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

const serverOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certificates', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certificates', 'cert.pem')),
};
  
app.use(express.static('public'));
app.use('/api', routes);

const server = https.createServer(serverOptions, app);

initializeWebSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port https://localhost:${port}`);
});