const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const express = require("express");
const connectDb = require("./connect/db");
const { Server } = require("socket.io");
const storedata = require("./utils/sendMessage");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(cors());

connectDb();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected : ${socket.id}`);

  // join room
  socket.on("join_room", (data) => {
    socket.join(data);

    console.log(`User room ID ${socket.id} joined room ${data}`);
  });

  // send message
  socket.on("send_message", async (data) => {
    await storedata(data);

    // database
    // get
    console.log("data=> socket");
    socket.to(data.room).emit("receive_message", data);
    console.log("socket");
  });
  socket.on("disconnect", () => {
    console.log("user disconnect", socket.id);
  });
});

server.listen(3001, () => {
  console.log("server running on port 3001");
});
