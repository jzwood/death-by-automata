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
    if (local){
      local.clubHouse.getMap().has(key) ? updateMember(key,users[key]) : initMember(key,users[key])
    }
  }
})

socket.on('removeUser', userId => {
  console.log('deleted',userId,'from client map')
  let map = local.clubHouse.getMap()
  if (map.has(userId)){
    stage.removeChild(map.get(userId).graphics)
    map.delete(userId)

  }else{
    console.log("Deleting non-existent user:",userId)
  }

})

// Should only be called once
function pingServer(ids){
  pingServer = Function("") //prevents initSocketListener from being used more than once
  var updateServer = window.setInterval( () => {
    if(local){
      let me = local.clubHouse.getMap().get(socket.id)
      if(me){
        socket.emit('updateUser', me.getProps())
      }
    }
  }, 100)
}


// start pinging server
(socket => {
  pingServer()
})()
