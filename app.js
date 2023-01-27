require('dotenv').config();

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

const logger = require('./logger/logger');

io.on('connection', (socket) => {
  logger.info('connection :', { message: socket.id });
  const { watchJoin, watchSend, watchBye } = initSocket(socket);
  watchJoin();
  watchSend();
  watchLeave();
  watchBye();
});

const initSocket = (socket) => {
  logger.info('새로운 소켓이 연결되었습니다.');
  function watchEvent(event, func) {
    socket.on(event, func);
  }

  function notifyToChatbot(event, data, link, room) {
    logger.info('chatbot 데이터를 emit합니다.');
    socket.join(room);
    io.to(room).emit(event, data, link);
  }

  function notifyToChat(event, data, room) {
    logger.info('chat 데이터를 emit합니다.');
    socket.join(room);
    io.to(room).emit(event, data);
  }

  return {
    watchJoin: () => {
      watchEvent('join', async (data) => {
        const { room, nickname } = data;
        socket.join(room);
        io.to(room).emit(
          'join',
          `안녕하세요 ${nickname}님 필넛츠 문의하기입니다!`
        );
        logger.info('방 접속에 성공하였습니다.');
      });
    },

    watchLeave: () => {
      watchEvent('leave', async (data) => {
        const { room, nickname } = data;
        socket.leave(room);
        io.to(room).emit('leave', `${nickname}님이 방을 나갔습니다!`);
        logger.info('방을 나가가셨습니다.');
      });
    },

    watchSend: () => {
      watchEvent('chatting', async (data) => {
        logger.info(`data : ${data}`);
        const { type, room, message } = data;
        logger.info(`room : ${room}`);
        logger.info(`message : ${message}`);
        let content;
        let link;
        if (type === '챗봇') {
          if (message.includes('이메일')) {
            content = '이메일로 문의할 사항이 있나요?';
            link =
              'https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=pillnutsss@gmail.com';
          } else if (message.includes('개발자')) {
            content = '개발자들이 궁금하신가요?';
            link = 'http://www.naver.com';
          } else if (message.includes('설문조사')) {
            content = '설문조사 참여하고 경품 받아가세요!';
            link = 'http://www.naver.com';
          } else if (message.includes('채팅')) {
            content = '채팅 상담이 필요하신가요?';
            link = 'http://www.naver.com';
          } else {
            content = '등록되지않은 키워드입니다';
            link = 'http://www.naver.com';
          }
          notifyToChatbot('receive', content, link, room);
        } else {
          notifyToChat('receive', content, room);
        }
      });
    },
    watchBye: () => {
      watchEvent('disconnect', () => {
        logger.info('채팅 접속 해제');
      });
    },
  };
};

app.get('/', (req, res) => {
  res.send('pillNuts Chatting Server!!');
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
http.listen(3000, handleListen);
