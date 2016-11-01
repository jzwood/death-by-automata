"use strict";

var io
let socket = (() => {
  var isPrivate = location.href.indexOf('/private')
  return isPrivate > 0 ? io('/private') : io('/public')
})()

//hopefully alerts the server which room socket should join
socket.emit('init',window.location.pathname.slice(-40))

socket.on('sync', users => {
  const roomUsers = Object.keys(users)
  for (const key of roomUsers) {
    local.clubHouse.has(key) ? updateMember(key,users[key]) : initMember(key,users[key])
  }
})

socket.on('removeUser', userId => {
  console.log('deleted',userId,'from client map')
  local.clubHouse.delete(userId)
})

// Should only be called once
function pingServer(ids){
  pingServer = Function("") //prevents initSocketListener from being used more than once
  var updateServer = window.setInterval( () => {
    if(local.clubHouse.get(socket.id)){
      socket.emit('updateUser', local.clubHouse.get(socket.id).getProps())
    }
  }, 100)
}


// start pinging server
(socket => {
  pingServer()
})()
