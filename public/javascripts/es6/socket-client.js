function connectToServer(socket, collection){
  //hopefully alerts the server which room socket should join
  socket.emit('init',window.location.pathname.slice(-40))
  addSyncListener(socket,collection)
  addRmUserListener(socket,collection)
  const framesPerSecond = 60
  setPingInterval(framesPerSecond,collection)
}

function addSyncListener(s,c){
  s.on('sync', users => {
    const roomUsers = Object.keys(users),
    club = local.clubHouse
    if(club){
      for (const key of roomUsers) {
        club.getMap().has(key) ? club.updateMemberInformation(key, users[key]): club.initMember(key, users[key])
      }
    }else{
      console.error("local.clubHouse not found in socket-client.\nlocal:",local)
    }
  })
}

function addRmUserListener(s,c){
  s.on('removeUser', userId => {
    console.log('deleted',userId,'from client map')
    let map = local.clubHouse.getMap()
    if (map.has(userId)){
      map.delete(userId)
    }else{
      console.log("Deleting non-existent user:",userId)
    }
  })
}

function addKeyPressListener(callback){
  const timePerCall = 500
  document.addEventListener('keydown', function(event) {
    throttle(callback(),timePerCall)
 }, false)
}

// Should only be called once
function setPingInterval(fps,c){
  const wait = 1000 / fps
  startPingingServer = Function('') //prevents initSocketListener from being used more than once
  let updateServer = window.setInterval( () => {
    let me = local.clubHouse.getMap().get(socket.id)
    if(me){
      socket.emit('updateUser', me.getProps())
    }
  }, wait)
}
