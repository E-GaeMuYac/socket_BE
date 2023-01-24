const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
require("dotenv").config();
app.use(cors());

io.on("connection", (socket) => {
  socket.on("chatting", (data) => {
    socket.join(data);

    socket.to(data).emit(`${socket.nickname}가 입장했습니다.`);
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit(`${socket.nickname}가 떠났습니다.`)
    );
  });
  socket.on("new_message", (msg, roomName) => {
    socket.to(roomName).emit("new_message", `${socket.nickname} : ${msg}`);
  });
  socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});

app.get("/", (req, res) => {
  res.send("pillnuts Chatting Server");
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
http.listen(3000, handleListen);
