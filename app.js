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
  io.emit('connection', '연결 성공!');

  logger.info('socketId : ', { message: socket.id });

  socket.on('joinRoom', (data) => {
    logger.info('data : ', { message: data });
    socket.join(data.room);
    io.to(data.room).emit(
      'joinRoom',
      `${data.id}님이 ${data.room}방에 입장하였습니다.`
    );
    logger.info('data : ', {
      message: `${data.id}님이 ${data.room}방에 입장하였습니다.`,
    });
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

  socket.on('sendMessage', (data) => {
    logger.info('new_message : ', {
      message: `msg : ${msg}`,
    });
    io.to(data.room).emit('sendMessage', {
      id: item.id,
      inputText: item.inputText,
    });
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
