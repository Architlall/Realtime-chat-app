const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');
const app = express();
const server = http.createServer(app);


app.use(express.static(path.join(_dirname,"public")));

const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
