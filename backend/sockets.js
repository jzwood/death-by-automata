var helpers = require('./helpers.js')

function networking(io,namespace){

  var nsp = io.of(namespace),
      ref = {
        msg : {
          input:     'auie4hf2we',
          newroom:    '7yd3hi0djf',
          disconnect: 'hd78dg23h1'
        },
        roomKeys : {'default' : 'public'}
      }

  nsp.on('connection', function(socket){
    onConnect(socket,ref)

    // socket.on('disconnect', function(){
    //   onDisconnect(socket)
    // })
    //
    // socket.on(ref.msg.input, function(msg){
    //   onInput(socket,ref,msg)
    // })
    //
    // socket.on(ref.msg.newroom, function(msg){
    //   onNewRoom(socket,ref,msg)
    // })

  })

}

function onConnect(socket,ref){
  helpers.joinDefault(socket,ref.roomKeys)
  socket.to(ref.roomKeys.default).emit('init', { 'msg' : ref.msg, 'socketId' : socket.id })
}

function onDisconnect(socket,ref){
  // socket.broadcast.to(roomKeys[socket.id]).emit(msgId, 'Socket ' + helpers.print(socket.id) + ' has left us')
  // delete roomKeys[socket.id]
}

function onInput(socket,msg,roomKeys){
  // socket.broadcast.to(roomKeys[socket.id]).emit(msgId, msg)
}

function onNewRoom(socket,msg,roomKeys){
  // socket.broadcast.to(roomKeys[socket.id]).emit(msgId, msg)
}

exports.networking = networking;
