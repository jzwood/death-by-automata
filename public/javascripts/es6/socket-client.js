"use strict";

var io,
socket = (function(){
  var isPrivate = location.href.indexOf('/private')
  return isPrivate > 0 ? io('/private') : io('/public')
})()

socket.on('init', function(store){
  const map = store.map,
  allkeys = Object.keys(map)
  for (const key of allkeys) {
    console.log(store.map,fleet)
    if(fleet.has(key)){
      updateShip(key,map[key])
    }else{
      initShip(key,map[key])
    }
  }
  initSocketListener(store.ids)
  console.log(fleet,store.map)
})

// Should only be called once
function initSocketListener(ids){
  console.log('initSocketListener')
  initSocketListener = Function("") //prevents initSocketListener from being used more than once
  // socket.on(ids.userInput, function(user){
  //  fleet.set(userId,userData)
  // })
  socket.on(ids.disconnect, function(userId){
    console.log('deleted',userId,'from client map')
    fleet.delete(userId)
  })

  var updateServer = window.setInterval(function(){
    socket.emit(ids.update, fleet.get(socket.id).getProps())
  }, 100)

}
