"use strict";

var io
let socket = (function(){
  var isPrivate = location.href.indexOf('/private')
  return isPrivate > 0 ? io('/private') : io('/public')
})()

socket.emit('init',window.location.pathname)

socket.on('sync', function(store){
  const map = store.map,
  allkeys = Object.keys(map)
  for (const key of allkeys) {
    if(local.fleet.has(key)){
      updateShip(key,map[key])
    }else{
      initShip(key,map[key])
    }
  }
  initSocketListener(store.ids)
})

// Should only be called once
function initSocketListener(ids){
  local.me = socket.id
  console.log('initSocketListener')
  initSocketListener = Function("") //prevents initSocketListener from being used more than once
  socket.on(ids.disconnect, function(userId){
    console.log('deleted',userId,'from client map')
    local.fleet.delete(userId)
  })

  var updateServer = window.setInterval(function(){
    socket.emit(ids.update, local.fleet.get(socket.id).getProps())
  }, 100)

}
