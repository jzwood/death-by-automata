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
        x = 0, y = 0, vy = 0,
        isFalling = true, isColliding = false, underfoot = false,
        others = false, winning = false
    const maxVel = 2, scale = 70, border = 2, timeIncr = 0.025, gravity = -2, vyConst = 0.1 * gravity,
    divLine = local.dividerLine - scale / 2
    const color = isMe ? 0x009E60 : 0xFF9E9E

    member.isSelf = () => { return isMe; }

		let graphics = new PIXI.Graphics()
    // texture = PIXI.Texture.fromImage('images/sprite1.png'),
    // sprite = new PIXI.Sprite(texture)

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

    let state = {'up':false, 'down':false, 'left':false, 'right':false, 'time':0 },
    move = (vel) => {
      x += vel
    },
    detectWinning = onWinning => {
      winning = isMe && y < divLine
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
    jump = (magnitude) => {
      if (!isFalling){
        isFalling = true
        vy -= magnitude
      }
    },
    updatePosition = () => {
      //from key presses
      let getKeyState = (() => {
        if (state.right) move(maxVel)
        if (state.left) move(-maxVel)
        if (state.up) jump(7)
      })()

      let upkeep = (() => {
        vy += (winning) ? vyConst : -vyConst
        //gravity
        y += vy ;//+ -0.5 * gravity
        underfoot = false
      })()

      const maxWidth = local.canvasWidth - scale - border, maxHeight = local.canvasHeight - scale - border

      detectCollisions((otherX, otherY) => {
        let dx = Math.abs(otherX-x), dy = Math.abs(otherY-y)
        if (dy > dx){
          if(y - otherY < 0){
            //in air collision where you're on bottom
            y += vyConst
            isFalling = false
            vy = Math.min(vy,0) //you want your vy to be <= 0
          }else{
            //in air collision where you're on top
            underfoot = true
            y -= vyConst
            vy = Math.max(vy,0) //you want your vy to be >= 0
          }
        }else{
          x += (x - otherX < 0) ? -maxVel : maxVel
        }
      })

      let isWall = (() => {
        //wall collisions
        if (x > maxWidth) x = maxWidth
        else if (x < border) x = border
        if (y > maxHeight){
          y = maxHeight; vy = 0
          isFalling = underfoot ? true : false
        }
        else if (y < border) y = border
      })()

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
      detectWinning()

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

let isMyId = id => {
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

function updateMember(id, data) {
    if (!isMyId(id)){
      let member = local.clubHouse.getMap().get(id)
      member.setProps(data)
    }
}
