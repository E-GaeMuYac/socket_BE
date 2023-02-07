require('dotenv').config();

const { Server } = require('socket.io');
const { Chat } = require('./model/Chat');
const { Room } = require('./model/Room');
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
  auth: {
    type: 'basic',
    username: process.env.UI_USERNAME,
    password: process.env.UI_PASSWORD,
  },
});

const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

const logger = require('../logger/logger');

io.on('connection', (socket) => {
  socket.onAny(async () => {
    const roomList = await Room.find().sort('-updatedAt');
    io.emit('getRooms', roomList);
    logger.info(roomList);
    logger.info('time');
  });
  logger.info('connection :', { message: socket.id });
  const { watchJoin, adminJoin, watchSend, watchBye, adminSend, adminLeave } =
    initSocket(socket);
  watchJoin();
  adminJoin();
  watchSend();
  adminSend();
  watchBye();
  adminLeave();
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
    socket.broadcast.to(room).emit(event, message);
  }

  function loadToChat(event, message, room) {
    io.to(room).emit(event, message);
  }

  return {
    watchJoin: () => {
      watchEvent('join', async (data) => {
        const { room } = data;
        if (room) {
          const userChats = await Chat.find({ room }).limit(30).lean();
          logger.info(userChats);
          socket.join(room);
          loadToChat('load', userChats, room);
          io.to(room).emit(
            'join',
            `안녕하세요 필넛츠 문의하기입니다!\n \n키워드를 입력해주세요!`
          );
        } else {
          const noUserChats = await Chat.find({ room: ip }).limit(30).lean();
          socket.join(ip);
          loadToChat('load', noUserChats, ip);
          io.to(ip).emit(
            'join',
            `안녕하세요 필넛츠 문의하기입니다!\n \n키워드를 입력해주세요!`
          );
        }
      });
    },

    adminJoin: () => {
      watchEvent('adminJoin', async (data) => {
        socket.join(data);
        const userChats = await Chat.find({ room: data }).limit(30).lean();
        loadToChat('load', userChats, data);
        io.to(data).emit(
          'adminJoin',
          `관리자가 입장하였습니다!\n\n1분동안 채팅이 없을 시 상담이 종료됩니다.`
        );
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
            logger.info(`error : ${err}`);
          }
        });
      });
    },

    adminLeave: () => {
      watchEvent('adminLeave', async (data) => {
        const { room, user } = data;
        logger.info(room, user);
        socket.leave(room);
        await Room.findOneAndDelete({ room });
        io.to(room).emit(
          'adminLeave',
          `관리자가 퇴장하였습니다! \n\n다시 연결을 원하시면 "채팅"을 입력해주세요!`
        );
        logger.info(`관리자가 나갔습니다.`);
      });
    },

    watchSend: () => {
      watchEvent('chatting', async (data) => {
        logger.info(`data : ${JSON.stringify(data)}`);
        let { type, room, message, user } = data;
        let loginType = true;
        const day = dayjs(new Date()).get('days');
        const hour = dayjs(new Date()).get('hour');
        logger.info(day);
        logger.info(hour);
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
          if (message.includes('이메일') || message.includes('메일')) {
            content = '문의사항이 있으면 이메일을 보내주세요!\n';
            link =
              'https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&to=pillnutsss@gmail.com';
          } else if (message.includes('개발자') || message.includes('개발')) {
            content = '개발자들이 궁금하신가요?';
            link =
              'https://lying-tarsier-96f.notion.site/7b471acc5ccd486f8f79bde5208d63bd';
          } else if (
            message.includes('설문조사') ||
            message.includes('설문') ||
            message.includes('조사')
          ) {
            content = '설문조사 참여하고 경품 받아가세요!\n';
            link =
              'https://docs.google.com/forms/d/e/1FAIpQLSecVl62mf888KCfZ7RpNJ6gyEKiCLWoDGKbPpE7SPy4wPW2WQ/formResponse';
          } else if (message.includes('인스타')) {
            content = '필너츠 공식 인스타그램입니다!\n';
            link = 'https://www.instagram.com/pillnuts_official/';
          } else if (message.includes('이벤트')) {
            content = '이벤트가 궁금하신가요!\n';
            link = 'https://www.pillnuts.store/event';
          } else if (message.includes('구글')) {
            content = '혹시 필너츠를 구글에 검색해보셨나요?\n';
            link =
              'https://www.google.com/search?q=%ED%95%84%EB%84%88%EC%B8%A0&oq=%ED%95%84%EB%84%88%EC%B8%A0&aqs=chrome..69i57j0i13i512l3j46i13i512l2j0i13i512l3j46i13i512.655j0j15&sourceid=chrome&ie=UTF-8';
          } else if (message.includes('키워드')) {
            content =
              '이메일, 메일, 개발자 ,개발, 설문조사, 설문, 조사, 인스타, 채팅, 상담, 이벤트, 구글';
          } else if (message.includes('채팅') || message.includes('상담')) {
            if (day === 6 || day === 0 || hour < 14 || hour >= 21) {
              content =
                '지금은 채팅상담 운영시간이 아닙니다 :(\n\n운영시간\n평일 : 오후 2시 ~ 오후 9시';
            } else {
              content =
                '채팅 상담이 필요하신가요?\n\n운영시간\n평일 : 오후 2시 ~ 오후 9시';
            }
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
          await Room.updateOne(
            { room },
            { $set: { room, user, updatedAt: Date.now() } },
            { upsert: true }
          );
          await Room.findOneAndDelete({ room: socket.id });

          notifyToChat('receive', message, room);

          await chat.save((err) => {
            if (err) {
              logger.info(`error : ${err}`);
            }
          });
        }
      });
    },

    watchBye: () => {
      watchEvent('disconnect', (data) => {
        logger.info('채팅 접속 해제');
      });
    },
  };
};
