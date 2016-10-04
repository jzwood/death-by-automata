"use strict";

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    bodyParser = require('body-parser'),
    path = require('path'),
    // favicon = require('serve-favicon'),
    io = require('socket.io').listen(server),
    sockets = require(path.join(__dirname,'/backend/socket-server.js')),
    hbs = require('hbs'),
    error = require(path.join(__dirname,'/backend/error-handler.js'))

var index = require('./routes/index'),
    privateRoute = require('./routes/private'),
    publicRoute = require('./routes/public')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/views/partials')

app.set('port', Number(process.env.PORT || '3000'))

app.use(express.static(path.join(__dirname, '/public')))
app.use('/static', express.static(__dirname + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', index)
app.use('/public', publicRoute)
app.use('/private', privateRoute)

// catch 404 and forward to error handler
app.use(error.catch404)
// error handlers
// development error handler. will print stacktrace
if (app.get('env') === 'development') {
  app.use(error.developmentError)
}
// production error handler. no stacktraces leaked to user
app.use(error.productionError)

sockets.networking(io,'/public')
sockets.networking(io,'/private')

server.listen(app.get('port'), function(){
  console.log('listening on *:3000')
})
