import { Server as SocketServer } from 'socket.io';
import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors: {
        origin: [
            'https://chateemos.netlify.app',
            'http://localhost:3000'
        ]
    },
});

app.use(morgan('dev'));
app.use(cors());

io.on('connection', (socket) => {
    const id = socket.id;
    const room = socket.handshake.query.room || 'random';
    socket.join(room);

    console.log(`usuario ${id} conectado a la sala ${room}`);

    socket.on('chat message', (msg) => {
        io.to(room).emit('chat message', {
            user: msg.user,
            msg: msg.msg,
        });
    });

});

server.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));
