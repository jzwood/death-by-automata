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
        onFirstConnect(nsp, socket, cache, room, allTimers)
      })

      socket.on('clientDataPush',function(room, newRule){
        console.log('clientDataPush',clean(socket.id),room,newRule)
        if(cache[room]) cache[room].setRules(clean(socket.id),newRule)
      })

      //splices socket out of client socket list
      socket.on('disconnect', function() {
        var si = allClients.indexOf(socket)

        if(si < 0){ //remove when we're sure this isn't a thing
          console.error('error - allClients:', allClients)
        }

        allClients.splice(si, 1)

        var room = clientRooms.splice(si, 1)

        if(cache[room]){

          var remainingPlayers = cache[room].whackPlayer(clean(socket.id))
          console.log('User',clean(socket.id),'disconnected from room,',room)

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
function onFirstConnect(nsp, socket, cache, room, allTimers){
  if(!cache[room]) {
    console.log('no controller for room',room,'. instantiating controller.')
    cache[room] = state.controller()
    var wait = 750,
    timer = setInterval(function(){
      cache[room].updateAutomata()
      // socket.volatile.emit('updateBoard', cache[room].getBoard())
      nsp.to(room).volatile.emit('updateBoard', cache[room].getBoard())
    },wait)
    allTimers[room] = timer
  }

  socket.join(room)
  var players = cache[room].getPlayerData(),
  usersInRoom = Object.keys(players),
  colorIndices = []
  for(var i=0, n=usersInRoom.length; i<n; i++){
    var color = players[usersInRoom[i]].color
    if(color) colorIndices.push(color)
  }

  var colorsAvailable = [4,3,2,1].filter(function(x) { return colorIndices.indexOf(x) < 0 })

  if(colorsAvailable.length > 0){
    var cleanId = clean(socket.id),
    // colorIndex = usersInRoom + 1
    colorIndex = colorsAvailable.pop()
    socket.emit('colorAssignment', colorIndex)
    cache[room].setColor(cleanId, colorIndex) //because 0 is reserved for black
    cache[room].setRules(cleanId,'/')

    console.log('user',clean(socket.id), 'connected to room', room)
  }else{
    var warning = 'This room is full. You may watch or try a new room.'
    socket.emit('removeInputfield', warning)
    console.warn(warning)
  }
}
