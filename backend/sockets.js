var helpers = require('./helpers.js')

function networking(io,namespace){

  var nsp = io.of(namespace)
  var msgId = '7ydhidjf' //arbitray
  var roomKeys = {'default':'public'}

  nsp.on('connection', function(socket){
    // console.log(msgId,roomKeys,'OC')
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
  socket.broadcast.to(roomKeys.default).emit(msgId, 'Please welcome: ' + helpers.print(socket.id))
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
