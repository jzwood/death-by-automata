"use strict";

function clean(id){
  return (id.slice(id.indexOf("#")+1)).toString()
}

function getRoomById(cache,id){
  var cacheKeys = Object.keys(cache)
  for(var i=0, len = cacheKeys.length; i < len; i++){
    if(cache[cacheKeys[i]][id]) return cacheKeys[i]
  }
  return ''
}

function networking(io, namespace) {

  var nsp = io.of(namespace),
  cache = {}

  nsp.on('connection', function(socket) {
    socket.on('init',function(room){
      onConnect(nsp, socket, cache, room)
    })
    onDisconnect(socket,cache)
    onUserSync(socket,cache)
  })
}

function onConnect(nsp, socket, cache, roomId){
  cache[roomId] = cache[roomId] || {}
  cache[roomId][clean(socket.id)] = {
    room: roomId,
    x: -1, y: -1
  }
  socket.join(roomId)
  nsp.to(roomId).emit('sync', cache[roomId])
  console.log('user connected.')
}

function onUserSync(socket,cache){
  socket.on('updateUser', function(props){
    var cleanId = clean(socket.id),
    userRoom = getRoomById(cache, cleanId)
    if(userRoom && cache[userRoom][cleanId]){
      try{
        var user = cache[userRoom][cleanId]
        if(user.x !== props.x || user.y !== props.y){
          user.x = props.x
          user.y = props.y
          socket.broadcast.to(userRoom).emit('sync',cache[userRoom])
        }
      }catch(e){
        throw new Error(e.name + ': ' + e.message)
      }
    }else{
      console.log("onUserSync is trying to find room:",userRoom,'with id:',cleanId," against cache", cache, ". Room Not Found.")
    }
  })
}

function onDisconnect(socket,cache){
  socket.on('disconnect', function() {
    var cleanId = clean(socket.id),
    userRoom = getRoomById(cache,clean(socket.id))
    console.log('socket ',clean(socket.id),'attempting to disconnect')
    if(userRoom){
      var user = cache[userRoom][cleanId]
      socket.broadcast.to(userRoom).emit('removeUser', cleanId)
      console.log('user in room ',user.room,' erased.')
      delete cache[userRoom][cleanId]
      if(Object.keys(cache[userRoom]).length === 0){
        delete cache[userRoom]
      }
    }else{
      console.log("onDisconnect is trying to find room:",userRoom,'with id:',clean(socket.id),". Room Not Found.")
    }
  })
}

exports.networking = networking;
