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

  function notifyToChat(event, data, link) {
    logger.info('chat 데이터를 emit합니다.');
    io.emit(event, data, link);
  }

  return {
    watchJoin: () => {
      watchEvent('join', async (data) => {
        const { room } = data;
        socket.join(room);
        logger.info('방 접속에 성공하였습니다.');
      });
    },

    watchSend: () => {
      watchEvent('chatting', async (data) => {
        let content;
        if (data.includes('이메일')) {
          content = 'mailto:pillnutsss@gmail.com';
        } else if (data.includes('개발자')) {
          {
            (content = '개발자들이 궁금하신가요?'), (link = 'www.naver.com');
          }
        } else if (data.includes('설문조사')) {
          (content = '설문조사 참여하고 상품 받아가세요!'),
            (link = 'www.naver.com');
        }
        logger.info('chatting');
        notifyToChat('receive', content, link);
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
