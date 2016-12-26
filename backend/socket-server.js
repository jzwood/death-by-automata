"use strict";

// var msgpack = require("msgpack-lite");
//
// // encode from JS Object to MessagePack (Buffer)
// var buffer = msgpack.encode({"foo": "bar"});
//
// // decode from MessagePack (Buffer) to JS Object
// var data = msgpack.decode(buffer); // => {"foo": "bar"}
var path = require('path'),
state = require(path.join(__dirname,'/server-state.js'))

function clean(id){
  return (id.slice(id.indexOf("#")+1)).toString()
}

module.exports = {
  networking: function(io, namespace) {

    var nsp = io.of(namespace),
    allClients = [],
    clientRooms = [],
    allTimers = {},
    cache = {}

    nsp.on('connection', function(socket) {
      allClients.push(socket)

      socket.on('init',function(room){
        clientRooms[allClients.indexOf(socket)] = room
        onFirstConnect(socket, cache, room, allTimers)
      })

      socket.on('clientDataPush',function(room, newRule){
        console.log('clientDataPush',clean(socket.id),room,newRule)
        if(cache[room]) cache[room].setRules(clean(socket.id),newRule)
      })

      //splices socket out of client socket list
      socket.on('disconnect', function() {
        var si = allClients.indexOf(socket)

        if(!(si + 1)){ //remove when we're sure this isn't a thing
          console.error('error - allClients:', allClients)
        }

        allClients.splice(si, 1)

        var room = clientRooms.splice(si, 1)

        if(cache[room]){

          var remainingPlayers = cache[room].whackPlayer(clean(socket.id))

          if(!remainingPlayers){ //if no one in room -> tear it down
            cache[room].decommission() //potentially unnecessary
            delete cache[room]
            clearInterval(allTimers[room])
            console.log('No one connected to room:',room,'. Tearing it down.')
          }

          if (!allClients.length){ //if no one in any room -> tear everything down / hard reset (redundancy)
            cache = {}
            clientRooms = []

            var timers = Object.keys(allTimers).map(function(key) {
              return allTimers[key]
            })

            // var timers = Object.values(allTimers)
            for(var i=0, n=timers.length; i<n; i++){
              clearInterval(timers[i])
            }
            allTimers = {}
            console.log('No one connected to any socket -- hard reset')
          }
        }else{
          console.log('Untracked user disconnected')
        }
      })
    })
  }
}

//inits cache if !exists and joins room
function onFirstConnect(socket, cache, room, allTimers){
  if(!cache[room]) {
    console.log('no controller for room',room,'. instantiating controller.')
    cache[room] = state.controller()
    var wait = 200,
    timer = setInterval(function(){
      // console.log(cache[room].getBoard().slice(0,10))
      cache[room].updateAutomata()
      socket.volatile.emit('updateBoard', cache[room].getBoard())
    },wait)
    allTimers[room] = timer
  }

  var usersInRoom = Object.keys(cache[room].getPlayerData()).length
  if(usersInRoom < 4){ //4 max players to room
    var cleanId = clean(socket.id)
    cache[room].setColor(cleanId, usersInRoom + 1) //because 0 is reserved for black
    cache[room].setRules(cleanId,'/')

    socket.join(room)
    console.log('user',clean(socket.id), 'connected to room', room)
  }else{
    console.warn('4 users maximum to room')
  }
}
