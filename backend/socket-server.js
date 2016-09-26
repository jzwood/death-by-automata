var helper = require('./helpers.js')

function clean(id){
  return (id.slice(id.indexOf("#")+1)).toString()
}

function networking(io, namespace) {

  var nsp = io.of(namespace),
  store = {
    ids: {
      userInput:  'auie4hf2we',
      newRoom:    '7yd3hi0djf',
      disconnect: '6tddjsuwiw',
      update:     'su2j8d1din1'
    },
    map : {}
  }

  nsp.on('connection', function(socket) {
    onConnect(nsp, socket, store)
    onDisconnect(socket,store)
    onUserSync(socket,store)
    // onNewRoom(socket,store)
  })

}

function onConnect(nsp, socket, store){
  //when you first connect you need to know every user's state for your local initialization
  socket.join('public')
  store.map[clean(socket.id)] = {
    room: 'public',
    x: 100,
    y: 100,
    r: Math.random()*2*Math.PI
  }
  nsp.to('public').emit('init', store)
}

function onUserSync(socket,store){
  socket.on(store.ids.update, function(props){
    var userData = store.map[clean(socket.id)]
    userData.x = props.x
    userData.y = props.y
    userData.r = props.r
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

function onNewRoom(socket, msg, roomKeys) {
  // socket.broadcast.to(roomKeys[socket.id]).emit(msgId, msg)
}

exports.networking = networking;
