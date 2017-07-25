var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('src'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var users = [];

io.on('connection', function (socket) {

  socket.on('hello', (userName) => {
    users[socket.id] = userName;
    console.log(`user ${users[socket.id]} connected`);
  });

  socket.on('disconnect', () => {
    console.log(`user ${users[socket.id]} connected`);
    socket.broadcast.emit('userleft', `user ${users[socket.id]} disconnected`);

    users[socket.id] = null;
    console.log(users);
  });

  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('usertyping', () => {
    socket.broadcast.emit('useristyping', `user ${users[socket.id]} is typing`);
  });
});

http.listen(3000, function () {
  console.log('listenning on *:3000');
});