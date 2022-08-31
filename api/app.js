const express = require("express");
const routes = require("./src/routes");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
const socketio = require("socket.io");
const http = require("http");

require("./db.js");

app.options("*", cors());
app.name = "API";

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(cors());
app.use("/", routes);

// Error catching endware.
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});

let users = [];

//trae los ids de los usuarios conectados desde el front
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
// elimina el Id del que se desconecta
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// encuentra un user por id y lo devuelve
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
 
};

io.on("connection", (socket) => {
  //cuando se conecta un usuario
  console.log("a user connected.");

  //toma el userId y socketId desde user del front
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
    console.log("soy users", users);
  });

  //recibe los mensajes del front y se lo envia al user indicado
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    //busca al receiver y envia un mensaje a este usuario
    const user = getUser(receiverId);
    console.log("reciever", receiverId)
console.log("aqui",user.socketId)
      io.to(user.socketId).emit("getMessage", { 
        //este es mi sender
        senderId,
        text
       });
    
   
  });

  //cuando se desconecta

  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    console.log("soy users", users.socketId);
    io.emit("getUsers", users);
  });
});
module.exports = server;
