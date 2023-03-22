const express = require("express");
const app = express()
const cors = require("cors")
const http = require('http').Server(app);
const mysql = require("mysql");
require("dotenv").config();
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 4000;
const socketIO = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000"
  }
});

app.use(cors())
let users = []

const db = mysql.createPool({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
})

socketIO.on('connection', (socket) => {
  console.log(`${socket.id} user just connected!`)
  socket.on("message", data => {

    const name = data.name;
    const text = data.text;
    const socketID = data.socketID;
    const chatID = data.chatID;

    const sqlInsert = "INSERT INTO chat_messages (name, text, socketID, chatID) VALUES (?,?,?,?)";
    db.query(sqlInsert, [name, text, socketID, chatID], (err) => {
      if (err) {
        console.log(err);
      }
    })

    socketIO.emit("messageResponse", data)
  })

  socket.on("newUser", data => {
    users.push(data)

    if (users.length >= 2) {
      const id = uuidv4();

      users.map(user => user.chatId = id);
    }

    socketIO.emit("newUserResponse", users)
  })

  socket.on('disconnect', () => {
    console.log(`${socket.id} user disconnected`);
    users = users.filter(user => user.socketID !== socket.id)
    socketIO.emit("newUserResponse", users)
    socket.disconnect()
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello" })
});


http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});