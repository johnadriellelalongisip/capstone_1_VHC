const https = require('https');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const routes = require('./routes/routes');
const socketIO = require('socket.io');

const app = express();
const port = 5000;

app.use(cors({
  origin: ['https://localhost:3000', 'https://192.168.1.2:3000'],
  methods: 'POST,GET,OPTIONS,HEAD,PUT,PATCH,DELETE',
  credentials: true,
}));
app.use(express.json());

const serverOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certificates', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certificates', 'cert.pem')),
};

app.use(express.static('public'));
app.use('/api', routes);

const server = https.createServer(serverOptions, app);

server.listen(port, () => {
  console.log(`Server is running on port https://localhost:${port}`);
});