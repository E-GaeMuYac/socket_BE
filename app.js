require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const connect = require('./config/db');
connect();

require('./socket');

const http = require('http').createServer(app);

app.get('/', (req, res) => {
  res.send('pillNuts Chatting Server!!');
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
http.listen(3000, handleListen);

module.exports = http;
