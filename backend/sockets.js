var helpers = require('./helpers.js')

function networking(io,namespace){

  var nsp = io.of(namespace),
      msg = {
        input:      'auie4hf2we',
        newroom:    '7yd3hi0djf',
        disconnect: 'hd78dg23h1'
      },
      roomKeys = {'default':'public'}

  nsp.on('connection', function(socket){
    onConnect(socket,msgId,roomKeys);

    socket.on('disconnect', function(){
      onDisconnect(socket,msgId,roomKeys)
    })

    socket.on(msgId, function(msg){
      onMessage(socket,msgId,msg,roomKeys)
    })

  })

}

function onConnect(socket,msgId,roomKeys){
  helpers.joinDefault(socket,roomKeys)
  socket.to(roomKeys.default).emit('init', { 'msg' : msg, 'socket' : socket })
}

function onDisconnect(socket,msgId,roomKeys){
  socket.broadcast.to(roomKeys[socket.id]).emit(msgId, 'Socket ' + helpers.print(socket.id) + ' has left us')
  delete roomKeys[socket.id]
}

function onMessage(socket,msgId,msg,roomKeys){
  if(helpers.joinRoomRequestHandler(socket,msg,roomKeys)){
    socket.broadcast.to(roomKeys[socket.id]).emit(msgId, msg)
  }
  if(msg === "getid"){
    console.log(socket.id)
  }else if (msg === "getkeys") {
    console.log(roomKeys)
  }
}

exports.networking = networking;
