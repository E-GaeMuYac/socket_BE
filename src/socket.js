const { Server } = require('socket.io');
const { Chat } = require('./model/Chat');
const http = require('./app');
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

const logger = require('../logger/logger');

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

  function notifyToChatbot(event, data, link, room) {
    logger.info('chatbot 데이터를 emit합니다.');
    socket.join(room);
    io.to(room).emit(event, data, link);
  }

  function notifyToChat(event, data, room) {
    logger.info('chat 데이터를 emit합니다.');
    io.to(room).emit(event, data);
  }

  return {
    watchJoin: () => {
      watchEvent('join', async (data) => {
        const { room, nickname } = data;
        socket.join(room);

        const chats = await Chat.find({ room }).limit(20).lean();
        logger.info(`get chats : ${chats}`);
        io.to(room).emit(
          'join',
          `안녕하세요 ${nickname}님 필넛츠 문의하기입니다!`
        );
        notifyToChat('load', chats, room);
        logger.info('방 접속에 성공하였습니다.');
        logger.info(`GetRooms : ${io.sockets.adapter.rooms}`);
      });
    },

    watchSend: () => {
      watchEvent('chatting', async (data) => {
        logger.info(`data : ${data}`);
        const { type, room, message, user } = data;
        logger.info(`room : ${room}`);
        logger.info(`message : ${message}`);
        logger.info(`type : ${type}`);
        let content;
        let link;
        if (type === '챗봇') {
          if (message.includes('이메일')) {
            content = '이메일로 문의할 사항이 있나요?';
            link =
              'https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=pillnutsss@gmail.com';
          } else if (message.includes('개발자')) {
            content = '개발자들이 궁금하신가요?';
            link = 'https://www.notion.so/7b471acc5ccd486f8f79bde5208d63bd';
          } else if (message.includes('설문조사')) {
            content = '설문조사 참여하고 경품 받아가세요!';
            link = 'https://www.pillnuts.store/event';
          } else if (message.includes('채팅')) {
            content = '채팅 상담이 필요하신가요?';
          } else {
            content = '등록되지않은 키워드입니다.';
          }
          notifyToChatbot('receive', content, link, room);
        } else {
          const chat = new Chat({
            room,
            message,
            user,
          });
          notifyToChat('receive', content, room);
          await chat.save((err) => {
            if (err) {
              logger.info(`error : ${err}`);
            }
          });
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
