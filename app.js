const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const http = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(http, {
  cors: {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST'],
  },
});
const { instrument } = require('@socket.io/admin-ui');
instrument(io, {
  auth: false,
});
require('dotenv').config();

const logger = require('./logger/logger');

io.on('connection', (socket) => {
  logger.info('socketId : ', { message: socket.id });
  socket.on('chatting', (data) => {
    logger.info('data : ', { message: data });
    io.emit('chatting', data);
    socket.join(data);
    socket
      .to(data)
      .emit('join', `${socket.nickname}가 입장했습니다. ID : ${socket.id}`);
  });

  socket.on('disconnecting', () => {
    socket.rooms.forEach((room) =>
      socket
        .to(room)
        .emit('leave', `${socket.nickname}가 떠났습니다. ID : ${socket.id}`)
    );
    logger.info('leaveRoom : ', {
      message: `${socket.nickname}가 떠났습니다. ID : ${socket.id}`,
    });
  });

  socket.on('new_message', (msg, roomName) => {
    logger.info('new_message : ', {
      message: `roomName : ${roomName}, msg : ${msg}`,
    });
    socket.to(roomName).emit('new_message', `${socket.nickname} : ${msg}`);
  });

  socket.on('nickname', (nickname) => {
    logger.info('nickname : ', { message: nickname });
    socket['nickname'] = nickname;
  });
});

app.get('/', (req, res) => {
  res.send('pillNuts Chatting Server!!');
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
http.listen(3000, handleListen);
