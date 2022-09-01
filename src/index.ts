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
        origin: 'https://chateemos.netlify.app/',
    },
});

app.use(morgan('dev'));
app.use(cors());

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', {
            user: msg.user,
            msg: msg.msg,
        });
    });

    socket.on('disconnect', () => {
    });
});

server.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));
