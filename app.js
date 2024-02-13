const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// バックグラウンドの色を環境変数から取得する関数
function getBackgroundColor() {
    return process.env.BACKGROUND_COLOR || 'lightgray';
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // クライアントからのメッセージを受信し、Pongメッセージをブロードキャストする
    socket.on('message', (msg) => {
        console.log('Message: ' + msg);
        io.emit('message', 'Pong');
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
