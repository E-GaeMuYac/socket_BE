const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
require("dotenv").config();
app.use(cors());

io.on("connection", (socket) => {
  socket.on("chatting", (data) => {
    console.log(data)
    io.emit("chatting", data)
  });
});

app.get('/',(req, res) => {
 res.send('CICD1')
})

const handleListen = () => console.log(`Listening on http://localhost:3000`);
http.listen(3000, handleListen);
