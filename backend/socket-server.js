"use strict";

// var msgpack = require("msgpack-lite");
//
// // encode from JS Object to MessagePack (Buffer)
// var buffer = msgpack.encode({"foo": "bar"});
//
// // decode from MessagePack (Buffer) to JS Object
// var data = msgpack.decode(buffer); // => {"foo": "bar"}

var state = require(path.join(__dirname,'/server-state.js'))

function clean(id){
  return (id.slice(id.indexOf("#")+1)).toString()
}

module.exports = {
  networking: function(io, namespace) {

    var nsp = io.of(namespace),
    ids = {},
    allClients = [],
    clientRooms = []

    nsp.on('connection', function(socket) {
      allClients.push(socket)

      socket.on('init',function(room){
        clientRooms[allClients.indexOf(socket)] = room
        onFirstConnect(socket, cache, room)
      })

      socket.on('clientDataPush',function(room, newRule){
        cache[room].rules[clean(socket.id)].rule = newRule
      })

      socket.on('clientDataRequest', function(room){
          socket.volatile.emit('updateUser', cache[room].control.getBoard())
      })

      //splices socket out of client socket list
      socket.on('disconnect', function() {
        var si = allClients.indexOf(socket)

        if(!(si + 1)){ //remove when we're sure this isn't a thing
          console.error('error - allClients:', allClients)
        }

        allClients.splice(si, 1)
        room = clientRooms.splice(si, 1)

        delete cache[room][clean(socket.id)]
        if (!allClients.length){
          cache = {} //if no one is connected hard reset
          clientRooms = []
        }
      })
    })
  }
}

function getRoomById(cache,id){
  var cacheKeys = Object.keys(cache)
  for(var i=0, n = cacheKeys.length; i < n; i++){
    if(cache[cacheKeys[i]][id]) return cacheKeys[i]
  } return ''
}

//inits cache if !exists and joins room
function onFirstConnect(socket, cache, room){
  cache[room] = cache[room] || {
    rules: {},
    control: state.controller()
  }
  var usersInRoom = Object.keys(cache[room].rules).length
  if(usersInRoom < 4){ //4 max players to room
    var cleanId = clean(socket.id)
    cache[room].rules[cleanId].color = usersInRoom
    cache[room].rules[cleanId].rule = ''

    socket.join(roomId)
    console.log('user',clean(socket.id), 'connected to room',clean(socket.id))
  }else{
    console.warn('4 users maximum to room')
  }
}

function throttle(func, ms){
	var last = 0;
	return function(){
		var a = arguments, t = this, now = +(new Date);
		//b/c last = 0 will still run the first time called
		if(now >= last + ms){
			last = now;
			func.apply(t, a);
		}
	}
}
