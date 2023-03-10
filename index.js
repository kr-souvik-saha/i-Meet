const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {
    Server
} = require("socket.io");
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log("New user joined ", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })
    socket.on('chat-message', (msg) => {
        console.log("Message recieved is- " + msg)
        io.emit('chat-message', msg)
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', {
            message: message,
            name: users[socket.id]
        })
    });
})

server.listen(3000, () => {
    console.log('listening on *:3000');
});