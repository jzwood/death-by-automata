

function joinRoomRequestHandler(socket,msg,roomKeys){
  if(msg.toLowerCase().startsWith('newroom:')){
      var currentRoom = roomKeys[socket.id]
      var newRoom = msg.slice(msg.indexOf(':') + 1)
      if(newRoom && newRoom !== currentRoom){
        socket.leave(currentRoom)
        roomKeys[socket.id] = newRoom
        console.log("current",currentRoom,"new",newRoom,"keys",roomKeys)
        socket.join(roomKeys[socket.id])
      }
      return false
  }
  return true
}

function joinDefault(socket,roomKeys){
  roomKeys[socket.id] = roomKeys.default
  socket.join(roomKeys.default)
}

function print(id){
  return id.slice(id.indexOf("#")+1)
}


exports.joinRoomRequestHandler = joinRoomRequestHandler
exports.joinDefault = joinDefault
exports.print = print
