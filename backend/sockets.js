function networking(io,namespace){

  var nsp = io.of('/' + namespace)
  var msgId = '7ydhidjf'

  nsp.on('connection', function(socket){
    socket.broadcast.emit(msgId, 'Someone Logged on')
    socket.on('disconnect', function(){
      socket.broadcast.emit(msgId, 'Someone left')
    })
    socket.on(msgId, function(msg){
      socket.broadcast.emit(msgId, msg)
    })

  })

}

exports.networking = networking;
