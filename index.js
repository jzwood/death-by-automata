"use strict";

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    path = require('path'),
    // favicon = require('serve-favicon'),
    io = require('socket.io').listen(server),
    sockets = require(path.join(__dirname,'/backend/socket-server.js')),
    hbs = require('hbs')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')

app.set('port', Number(process.env.PORT || '3000'))

app.use(express.static(path.join(__dirname, '/public')))
app.use('/static', express.static(__dirname + '/public'))

app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/private', require('./routes/private'))

sockets.networking(io,'/public')
sockets.networking(io,'/private')

server.listen(app.get('port'), function(){
  console.log('listening on *:3000')
})
