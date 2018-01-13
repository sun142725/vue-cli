const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cookie = require('cookie-parse');

var onlineUser = {};
io.on('connection', (socket)=> {
    if (!socket.request.headers.cookie) {
        return;
    }
    let uid = cookie.parse(socket.request.headers.cookie).uid;
    onlineUser[uid] = socket.id;
    socket.emit('onlineUserChange', onlineUser);
    socket.broadcast.emit('onlineUserChange', onlineUser);
    socket.on('disconnect', ()=> {
        delete onlineUser[uid];
        socket.broadcast.emit('onlineUserChange', onlineUser);
    });

    socket.on('private', (v)=> {
        socket.to(v.data.to.sid).emit('incomingMessage', v)
    })
});
server.listen(8888);