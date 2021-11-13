const io = require('socket.io')
const server = require('./server');

let connectionCount = 0;
const socketServer = io(server);
socketServer.on('connection', (socket) =>{
    socketServer.emit('USER_COUNT', ++connectionCount);
    socket.on('disconnect', (data) => {
        socketServer.emit('USER_COUNT', --connectionCount);
    });
});

server.listen(3030);
