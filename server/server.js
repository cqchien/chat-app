const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const { generateMessage } = require("./utils/messTemplate");
const { generateLocation } = require("./utils/messTemplate");
const Room = require("./model/room");

const newRoom = new Room();

const app = express();
const server = http.createServer(app);

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("joinRoom", (msg) => {
    const { name, room } = msg.user;
    socket.join(room);

    newRoom.createUser({ id: socket.id, name: name, room: room });

    io.to(room).emit("usersInRoom", {
      usersInRoom: newRoom.users
    });
    console.log(newRoom.users.length);

    socket.emit(
      "messFromServer",
      generateMessage({ from: "admin", mess: "Welcome to APP" })
    );

    socket.broadcast.to(room).emit(
      "messFromServer",
      generateMessage({
        from: "admin",
        mess: "New user has joined"
      })
    );

    socket.on("messFromClient", (msg) => {
      console.log(msg);
      io.to(room).emit(
        "messFromServer",
        generateMessage({ from: msg.from, mess: msg.mess })
      );
    });

    socket.on("locationFromClient", (msg) => {
      io.to(room).emit(
        "locationFromServer",
        generateLocation({ from: "User", lat: msg.lat, lng: msg.lng })
      );
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const publicPath = path.join(`${__dirname}/../public`);
app.use(express.static(publicPath));

const port = 2000;
server.listen(port, () => {
  console.log(`App is running on ${port}`);
});
