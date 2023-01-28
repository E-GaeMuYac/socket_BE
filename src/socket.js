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
  const req = socket.request;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  function watchEvent(event, func) {
    socket.on(event, func);
  }

  function notifyToChatbot(event, data, link, room) {
    io.to(room).emit(event, data, link);
  }

  function notifyToChat(event, data, room) {
    io.to(room).emit(event, data);
    socket.leave(socket.id);
    io.emit(io._nsps.get('/').adapter.rooms);
    logger.info(
      `GetRooms : ${JSON.stringify(
        Object.fromEntries(io._nsps.get('/').adapter.rooms)
      )}`
    );
  }

  return {
    watchJoin: () => {
      watchEvent('join', async (data) => {
        const { room, user } = data;
        if (room) {
          socket.join(room);
          const userChats = await Chat.find({ room }).limit(20).lean();
          logger.info(`get chats : ${JSON.stringify(userChats)}`);
          notifyToChat('load', userChats, room);
          io.to(room).emit('join', `안녕하세요 필넛츠 문의하기입니다!`);
        } else {
          socket.join(ip);
          const noUserChats = await Chat.find({ room: ip }).limit(20).lean();
          logger.info(`get chats : ${JSON.stringify(noUserChats)}`);
          notifyToChat('load', noUserChats, room);
          io.to(ip).emit('join', `안녕하세요 ${user}님 필넛츠 문의하기입니다!`);
        }
      });
    },

    watchSend: () => {
      watchEvent('chatting', async (data) => {
        logger.info(`data : ${JSON.stringify(data)}`);
        let { type, room, message, user } = data;
        let loginType = true;
        if (!room) {
          room = ip;
          loginType = false;
        }
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
            loginType,
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
