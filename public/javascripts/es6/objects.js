"use strict";

/*
Object Factory
*/

// Stores User States
function newClubHouse() {
  let map = new Map()
  return {
    update : () => {
      for (let member of map.values()) {
        if(member.isSelf()){
          member.update(map.values())
        }else{
          member.update()
        }
      }
    },
    getMap: () => { return map }
  }
}

// User Object
function newClubMember(name, isMe=false) {
    let member = {},
        index = 0, others = false
    const maxVel = 2, scale = 70, border = 2

    member.isSelf = () => { return isMe; }

    let keyState = {'up':false, 'down':false, 'left':false, 'right':false}
    if (isMe) assignKeys(keyState)

		let move = (dx,dy) => {
      x += dx
      y += dy
    },
    detectCollisions = onCollision => {
      if (others){
        const epsilon = 0.01
        const contactZone = scale + 2 * border - epsilon
        for (let member of others){
          if (!member.isSelf()){
            let pos = member.getProps()
            if (Math.abs(pos.x - x) < contactZone && Math.abs(pos.y - y) < contactZone){
              onCollision(pos.x, pos.y)
              console.log('col')
            }
          }
        }
      }
    },
    updatePosition = () => {
      //from key presses
      IIFE(getKeyState = () => {
        if (state.right) move(1,0)
        if (state.left) move(-1,0)
        if (state.up) move(0,1)
        if (state.down) move(0,-1)
      })

    }

    member.update = (theOthers=false) => {

      others = theOthers
      let dx = (x - graphics.x),
          dy = (y - graphics.y)
      let decayX, decayY
      if (isMe) {
        updatePosition()
        decayX = decayY = 0.8
      }else{
        decayX = 0.1
        decayY = 0.3
      }
      //move box
      graphics.x += dx * decayX
      graphics.y += dy * decayY
    }

    member.getProps = () => {
        return {
            'x': x, 'y': y
        }
    }

    member.setProps = data => {
        x = data.x
        y = data.y
    }

    return member
}

function isMyId = id => {
  return id === socket.id
}

function initMember(id, data) {
    let member = newClubMember(id, isMyId(id))
    //default server x and y value
    if(data.x !== -1 && data.y !== -1){
      member.setProps(data)
    }else{
      //local default x and y init position
      member.setProps({x: local.canvasWidth/2, y: local.canvasHeight/2})
    }
    local.clubHouse.getMap().set(id, member)
}

function updateMemberInformation(id, data) {
    if (!isMyId(id)){
      let member = local.clubHouse.getMap().get(id)
      member.setProps(data)
    }
}
