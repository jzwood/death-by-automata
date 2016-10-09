"use strict";

var io
let socket = (function(){
  var isPrivate = location.href.indexOf('/private')
  return isPrivate > 0 ? io('/private') : io('/public')
})()

//hopefully alerts the server which room socket should join
socket.emit('init',window.location.pathname.slice(-40))

socket.on('sync', function(users){
  const roomUsers = Object.keys(users)
  for (const key of roomUsers) {
    local.fleet.has(key) ? updateShip(key,users[key]) : initShip(key,users[key])
  }
})

socket.on('removeUser', function(userId){
  console.log('deleted',userId,'from client map')
  local.fleet.delete(userId)
})

// Should only be called once
function pingServer(ids){
  pingServer = Function("") //prevents initSocketListener from being used more than once
  var updateServer = window.setInterval(function(){
    if(local.fleet.get(socket.id)){
      socket.emit('updateUser', local.fleet.get(socket.id).getProps())
    }
  }, 100)
}


// start pinging server
(function(socket){
  pingServer()
})()
