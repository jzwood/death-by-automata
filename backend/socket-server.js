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

function IIFE(f){f()}

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
        cache[room].setRules(clean(socket.id),newRule)
      })

      //splices socket out of client socket list
      socket.on('disconnect', function() {
        var si = allClients.indexOf(socket)

        if(!(si + 1)){ //remove when we're sure this isn't a thing
          console.error('error - allClients:', allClients)
        }

        allClients.splice(si, 1)
        var room = clientRooms.splice(si, 1)

        delete cache[room][clean(socket.id)]

        if(!Object.keys(cache[room]).length){ //if no one in room -> tear it down
          cache[room].decommission() //potentially unnecessary
          delete cache[room]
          window.clearInterval(allTimers[room])
          console.log('No one connected to room:',room,'. Tearing it down.')
        }

        if (!allClients.length){ //if no one in any room -> tear everything down / hard reset (redundancy)
          cache = {}
          clientRooms = []
          IIFE(function(){
            var timers = Object.values(allTimers)
            for(var i=0, n=timers.length; i<n; i++){
              window.clearInterval(timers[i])
            }
          })
          allTimers = {}
          console.log('No one connected -- hard reset')
        }
      })
    })
  }
}

//inits cache if !exists and joins room
function onFirstConnect(socket, cache, room, allTimers){
  cache[room] = cache[room] || state.controller()

  if(!cache[room]) {
    cache[room] = state.controller()
    var wait = 200,
    timer = window.setInterval(function(){
      cache[room].updateAutomata()
      socket.volatile.emit('updateBoard', cache[room].getBoard())
    },wait)
    allTimers[room] = timer
  }

  var usersInRoom = Object.keys(cache[room].getPlayerData()).length
  if(usersInRoom < 4){ //4 max players to room
    var cleanId = clean(socket.id)
    cache[room].setColor(cleanId, usersInRoom)
    cache[room].setRules(cleanId,'')

    socket.join(room)
    console.log('user',clean(socket.id), 'connected to room',clean(socket.id))
  }else{
    console.warn('4 users maximum to room')
  }
}
