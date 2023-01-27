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
  watchBye();
});

const initSocket = (socket) => {
  logger.info('새로운 소켓이 연결되었습니다.');
  function watchEvent(event, func) {
    socket.on(event, func);
  }

  function notifyToChat(event, data, link, room) {
    logger.info('chatbot 데이터를 emit합니다.');
    logger.info('edit');
    logger.info(event);
    logger.info(data);
    logger.info(link);
    logger.info(room);
    logger.info('edit');
    socket.join(room);
    socket.to(room).emit(event, data, link);
  }

  return {
    watchJoin: () => {
      watchEvent('join', async (data) => {
        const { room } = data;
        socket.join(room);
        logger.info('방 접속에 성공하였습니다.');
        logger.info(socket.id);
      });
    },

    watchSend: () => {
      watchEvent('chatting', async (data) => {
        logger.info(`data : ${data}`);
        const { room } = data;
        const { message } = data;
        logger.info(`room : ${room}`);
        logger.info(`message : ${message}`);
        let content;
        let link;
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
        }
        notifyToChat('receive', content, link, room);
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
