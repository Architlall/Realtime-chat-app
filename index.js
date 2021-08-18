const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');


const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser} = require('./utils/users');


const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const botName = 'ChatBot';

app.use(express.static(path.join(__dirname,"public")));


io.on('connection', socket => {
socket.on('joinRoom', ({username, room}) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    console.log('New websocket connection at :' + socket.id);
    socket.emit('message', formatMessage(botName, 'Welcome to Chat ON!'));
    socket.broadcast.to(user.room).emit('message', formatMessage(botName,`${user.username} has joined the chat`));
   
})

   

    socket.on('chatMessage', msg => {
        io.emit('message', formatMessage('User',msg));
        
    })

    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName,`A user has left the chat`));
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
