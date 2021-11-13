const io = require('socket.io')
const app = require('./app');

const socketServer = io(app);
socketServer.on('connection', function (socket) {
    let userName = "";
    socket.on('USER_NAME', (data) => {
        userName = data.user;
        socket.broadcast.emit('SERVER_MSG', {text:`Подключён пользователь ${data.user}`});
    });
    socket.on('disconnect', (data) => {
        socket.broadcast.emit('SERVER_MSG', {text:`Пользователь ${userName} отключён`});
    });
    socket.on('user-reconnected', (data) => {
        socket.broadcast.emit('SERVER_MSG', {text:`Пользователь ${userName} переподключён`});
    });

    socket.on('CLIENT_MSG', (data) => {
        socketServer.emit('SERVER_MSG', data);
    });
});

app.listen(3030, () => {
    console.log('Server started on port 3030');
});
