"use strict";

/*
Object Factory
*/

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

function newClubMember(name, isMe=false) {
    let member = {},
        x = 0, y = 0, vy = 0, isFalling = true, isColliding = false, others = false
    const maxVel = 2, scale = 50, border = 2, timeIncr = 0.025, gravity = -2
    const color = isMe ? 0x009E60 : 0xFF9E9E

    member.isSelf = () => { return isMe; }

		let graphics = new PIXI.Graphics()

    let drawSelf = (() => {
      // set a fill and line style
      graphics.beginFill(color)
      graphics.lineStyle(2 * border, 0xcccccc, 1)
      // draw a shape
      graphics.drawRect(0,0,scale,scale)
      graphics.endFill()

      stage.addChild(graphics)
      member.graphics = graphics //store in member object
    })()

    let state = {'up':false,'down':false,'left':false,'right':false, 'time':0 },
    move = (vel) => {
      x += vel
    },
    detectCollisions = () => {
      if (others){
        const contactZone = scale + 2 * border
        for (let member of others){
          if (!member.isSelf()){
            let pos = member.getProps()
            if (Math.abs(pos.x - x) < contactZone && Math.abs(pos.y - y) < contactZone){
              return true
            }
          }
        }
      }
      return false
    },
    jump = (magnitude) => {
      if (! isFalling){
        isFalling = true
        vy = -magnitude
      }
    },
    updatePosition = () => {

      let tX = x, tY = y
      //from key presses
      if (state.right) move(maxVel)
      if (state.left) move(-maxVel)
      if (state.up) jump(7)

      vy -= 0.1 * gravity
      //gravity
      y += vy ;//+ -0.5 * gravity

      const maxWidth = local.canvasWidth - scale - border, maxHeight = local.canvasHeight - scale - border
      // const maxWidth = local.canvasWidth - scale, maxHeight = local.canvasHeight - scale

      let isWall = (() => {
        //wall collisions
        // return x > maxWidth || x < border || y > maxHeight || y < border
        if (x > maxWidth) x = maxWidth
        else if (x < border) x = border
        if (y > maxHeight){ y = maxHeight; isFalling = false; vy = 0 }
        else if (y < border) y = border
      })()

      if (detectCollisions()){
        console.log(Math.abs(x-tX),Math.abs(y-tY))
        x = tX
        y = tY

        vy = 0
        isFalling = false
      }

    }

    if (isMe){
      let left = keyboard(37),
          up = keyboard(38),
          right = keyboard(39),
          down = keyboard(40)

      left.press = () => { state.left = true; }
      left.release = () => { state.left = false; }
      right.press = () => { state.right = true; }
      right.release = () => { state.right = false; }
      up.press = () => { state.up = true; }
      up.release = () => { state.up = false; }
      down.press = () => { state.down = true; }
      down.release = () => { state.down = false; }
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

function initMember(id, data) {
    let isMe =  socket.id === id
    let member = newClubMember(id, isMe)
    member.setProps(data)
    local.clubHouse.getMap().set(id, member)
}

function updateMember(id, data) {
    let member = local.clubHouse.getMap().get(id)
    member.setProps(data)
}
