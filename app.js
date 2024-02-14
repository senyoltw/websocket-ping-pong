const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const os = require('os');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    const clientAddress = socket.handshake.address;
    const clientHostname = os.hostname();

    console.log(`User connected from ${clientHostname} (${clientAddress})`);

    // クライアントからのメッセージを受信し、Pongメッセージをブロードキャストする
    socket.on('message', (msg) => {
        console.log('Message: ' + msg);

        // Pongメッセージと日時を含むメッセージをクライアントに送信
        const pongMessage = `Pong from ${clientHostname} (${clientAddress}) at ${new Date().toLocaleString()}`;
        io.emit('message', pongMessage);
    });
});

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
