const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const router = require('./draft_api');

const app = express();
const port = 3000;

// Middleware để parse JSON
app.use(bodyParser.json());


// Tạo HTTP server và Socket.io server
const server = http.createServer(app);
const io = socketIo(server);

// Khi có kết nối mới
io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// API 
app.use('/api', router);

// Lắng nghe server trên cổng chỉ định
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
