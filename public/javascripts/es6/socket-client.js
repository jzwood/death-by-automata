function connectToServer(socket){
  //hopefully alerts the server which room socket should join
  socket.emit('init',window.location.pathname.slice(-40))

  socket.on('sync', users => {
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

  socket.on('removeUser', userId => {
    console.log('deleted',userId,'from client map')
    let map = local.clubHouse.getMap()
    if (map.has(userId)){
      map.delete(userId)
    }else{
      console.log("Deleting non-existent user:",userId)
    }
  })
}

function pingServer(ids,socket) {
  let me = local.clubHouse.getMap().get(socket.id)
  if (me) {
    socket.emit('updateUser', me.getProps())
  }
}
