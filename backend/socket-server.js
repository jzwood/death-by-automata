var helper = require('./helpers.js')

function networking(io, namespace) {

  var nsp = io.of(namespace),
  store = {
    ids: {
      userInput: 'auie4hf2we',
      newRoom: '7yd3hi0djf'
    },
    map : new Map(),
    roomMap = new Map([
      ['public', {}]
    ])
  }

  nsp.on('connection', function(socket) {

    // Initialization
    onConnect(nsp, socket, store)

    socket.on('disconnect', function() {
      onDisconnect(socket,store)
    })

    // socket.on(store.userInput, function(data){
    //
    // })

    // socket.on(ref.msg.newroom, function(msg){
    //   onNewRoom(socket,ref,msg)
    // })
  })

}

function onConnect(nsp, socket, store){
  socket.join('public')
  store.map.set(helper.clean(socket.id),{
    room: 'public',
    x: 100,
    y: 100,
    r: Math.PI / 3
  })
  nsp.to('public').emit('init', store)
}

function onDisconnect(socket,store) {
  var cleanId = helper.clean(socket.id),
  map = store.roomMap
  for (var [roomName, roomUsers] of map) {
    if(roomUsers[cleanId]){
      delete roomUsers[cleanId]
      socket.broadcast.to(roomName).emit(store.ids.disconnect, cleanId)
      if(helper.isEmpty(roomUsers)){
        map.delete(roomName)
      } break
    }
  }
}

function onConnect_old(nsp, socket, store){
  socket.join('public')
  var publicRoomUsers = store.roomMap.get('public')
  publicRoomUsers[helper.clean(socket.id)] = {
    x: 100,
    y: 100,
    r: Math.PI / 3
  }
  nsp.to('public').emit('init', store)
}

function onDisconnect(socket,store) {
  var cleanId = helper.clean(socket.id),
  map = store.roomMap
  for (var [roomName, roomUsers] of map) {
    if(roomUsers[cleanId]){
      delete roomUsers[cleanId]
      socket.broadcast.to(roomName).emit(store.ids.disconnect, cleanId)
      if(helper.isEmpty(roomUsers)){
        map.delete(roomName)
      } break
    }
  }
}

function onInput(socket, msg, roomKeys) {
  roomName = helper.getRoom(store,cleanId),
  users = store.roomMap.get(roomName)
  // socket.broadcast.to(roomKeys[socket.id]).emit(msgId, msg)
}

function onNewRoom(socket, msg, roomKeys) {
  // socket.broadcast.to(roomKeys[socket.id]).emit(msgId, msg)
}

exports.networking = networking;
