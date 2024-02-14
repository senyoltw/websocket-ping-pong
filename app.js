const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const os = require('os');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// バックグラウンドの色を環境変数から取得する関数
function getBackgroundColor() {
    return process.env.BACKGROUND_COLOR || 'lightgray';
}

app.get('/', (req, res) => {
    // バックグラウンドカラーをHTMLに渡す
    res.render('index', { background_color: getBackgroundColor() });
});

io.on('connection', (socket) => {
    const clientAddress = socket.handshake.address;
    const osHostname = os.hostname();

    console.log(`User connected from (${clientAddress})`);

    // クライアントからのメッセージを受信し、Pongメッセージをブロードキャストする
    socket.on('message', (msg) => {
        console.log('Message: ' + msg);

        // Pongメッセージと日時を含むメッセージをクライアントに送信
        const pongMessage = `Ping from (${clientAddress}), Pong from ${osHostname} at ${new Date().toLocaleString()}`;
        io.emit('message', pongMessage);
    });
});

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
