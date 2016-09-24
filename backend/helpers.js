function clean(id){
  return id.slice(id.indexOf("#")+1)
}

function isEmpty(obj){
  return Object.keys(obj).length
}


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



exports.joinRoomRequestHandler = joinRoomRequestHandler
exports.clean = clean
exports.isEmpty = isEmpty
