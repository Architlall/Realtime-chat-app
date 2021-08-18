const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);


app.use(express.static(path.join(__dirname,"public")));

io.on('connection', socket => {
    console.log('New websocket connection at :' + socket.id);
    socket.broadcast.emit('message', 'A user has joined the chat');
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');
    });

    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
        
    })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
