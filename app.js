require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const connect = require('./config/db');
connect();

const http = require('http').createServer(app);

app.get('/', (req, res) => {
  res.send('pillNuts Chatting Server!!');
});

module.exports = http;
