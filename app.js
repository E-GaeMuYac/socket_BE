const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
require("dotenv").config();

io.on("connection", (socket) => {
  socket.on("chatting", (data) => {
    socket.join(data);
    socket
      .to(data)
      .emit("join", `${socket.nickname}가 입장했습니다. ID : ${socket.id}`);
  });

  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("leave",`${socket.nickname}가 떠났습니다. ID : ${socket.id}`)
    );
  });

  socket.on("new_message", (msg, roomName) => {
    socket.to(roomName).emit("new_message", `${socket.nickname} : ${msg}`);
  });

  socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});

app.get("/", (req, res) => {
  res.send("pillNuts Chatting Server!!");
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
http.listen(3000, handleListen);
