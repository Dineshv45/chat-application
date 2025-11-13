const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const router = require('./router');

const app = express();
const server = http.createServer(app);

// ✅ Allow CORS for your React frontend (Vite on port 5173)
const io = socketio(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://chat-application-five-beta.vercel.app"
    ],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});



io.on('connection', (socket) => {
  console.log('🟢 New client connected:', socket.id);

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.join(user.room);
    // admin mean the server send the data like has joined or welcome
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to ${user.room}` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });


    // sending the users to everyone in the room
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
    console.log('🔴 User disconnected:', socket.id);
  });
});

app.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
