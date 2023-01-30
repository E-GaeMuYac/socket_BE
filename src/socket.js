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
  socket.leave(socket.id);
  console.log('connection :', { message: socket.id });
  const { watchJoin, adminJoin, watchSend, watchBye, adminSend } =
    initSocket(socket);
  watchJoin();
  adminJoin();
  watchSend();
  adminSend();
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

  function notifyToChat(event, message, room) {
    io.to(room).emit(event, message);
    io.emit(
      'getRooms',
      JSON.stringify(Object.fromEntries(io._nsps.get('/').adapter.rooms))
    );
    console.log(
      `GetRooms : ${JSON.stringify(
        Object.fromEntries(io._nsps.get('/').adapter.rooms)
      )}`
    );
  }

  return {
    watchJoin: () => {
      watchEvent('join', async (data) => {
        const { room } = data;
        if (room) {
          socket.join(room);
          const userChats = await Chat.find({ room }).limit(20).lean();
          console.log(`get chats : ${JSON.stringify(userChats)}`);
          notifyToChat('load', userChats, room);
          io.to(room).emit('join', `안녕하세요 필넛츠 문의하기입니다!`);
        } else {
          socket.join(ip);
          const noUserChats = await Chat.find({ room: ip }).limit(20).lean();
          console.log(`get chats : ${JSON.stringify(noUserChats)}`);
          notifyToChat('load', noUserChats, ip);
          io.to(ip).emit('join', `안녕하세요 필넛츠 문의하기입니다!`);
        }
      });
    },

    adminJoin: () => {
      watchEvent('adminJoin', (data) => {
        socket.join(data);
        io.to(data).emit('adminJoin', `관리자가 입장하였습니다!`);
      });
    },

    adminSend: () => {
      watchEvent('adminSend', async (data) => {
        let { room, message, user } = data;
        const chat = new Chat({
          room,
          message,
          user,
          loginType: true,
          admin: true,
        });
        notifyToChat('adminReceive', message, room);
        await chat.save((err) => {
          if (err) {
            console.log(`error : ${err}`);
          }
        });
      });
    },

    watchSend: () => {
      watchEvent('chatting', async (data) => {
        console.log(`data : ${JSON.stringify(data)}`);
        let { type, room, message, user } = data;
        let loginType = true;
        if (!room) {
          room = ip;
          loginType = false;
        }
        console.log(`room : ${room}`);
        console.log(`message : ${message}`);
        console.log(`type : ${type}`);
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
          notifyToChat('receive', message, room);
          await chat.save((err) => {
            if (err) {
              console.log(`error : ${err}`);
            }
          });
        }
      });
    },
    watchBye: () => {
      watchEvent('disconnect', () => {
        console.log('채팅 접속 해제');
      });
    },
  };
};
