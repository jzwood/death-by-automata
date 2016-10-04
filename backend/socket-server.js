function clean(id){
  return (id.slice(id.indexOf("#")+1)).toString()
}

function networking(io, namespace) {

  var nsp = io.of(namespace),
  store = {
    ids: {
      userInput:  'auie4hf2we',
      disconnect: '6tddjsuwiw',
      update:     'su2j8d1di1'
    },
    map : {}
  }

  nsp.on('connection', function(socket) {
    socket.on('init',function(room){
      onConnect(nsp, socket, store, room)
      onDisconnect(socket,store)
      onUserSync(socket,store)
    })
  })
}

function onConnect(nsp, socket, store, roomId){
  //when you first connect you need to know every user's state for your local initialization
  roomId = String(roomId.slice(-40));//String(Math.random())//
  socket.join(roomId)
  store.map[clean(socket.id)] = {
    room: roomId,
    x: 100,
    y: 100,
    r: Math.random()*2*Math.PI
  }
  nsp.to(roomId).emit('sync', store)
  console.log(store)
}

function onUserSync(socket,store){
  socket.on(store.ids.update, function(props){
    var userData = store.map[clean(socket.id)]
    userData.x = props.x
    userData.y = props.y
    if(userData.r !== props.r){
      userData.r = props.r
      socket.broadcast.to(userData.room).emit('sync',store)
    }
  })
}

function onDisconnect(socket,store){
  socket.on('disconnect', function() {
    // the user will be removed from room automatically.
    // This function simply removes user's server side data
    var cleanId = clean(socket.id),
    usermap = store.map
    if(usermap[cleanId]){
      var room = usermap[cleanId].room
      socket.broadcast.to(room).emit(store.ids.disconnect, cleanId)
      delete usermap[cleanId]
    }
  })
}

exports.networking = networking;
