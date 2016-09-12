var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    path = require('path'),
    // favicon = require('serve-favicon'),
    io = require('socket.io').listen(server)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.set('port', Number(process.env.PORT || '3000'))

server.listen(app.get('port'), function(){
  console.log('listening on *:3000');
})

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket){
  io.emit('chat message', 'Someone Logged on')
  socket.on('disconnect', function(){
    io.emit('chat message', 'Someone left')
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg)
  });
});
