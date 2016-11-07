"use strict";

/*
Object Factory
*/

function newClubHouse() {
  let map = new Map()
  return {
    update : () => {
      for (let member of map.values()) {
        member.update()
      }
    },
    getMap: () => { return map }
  }
}

function newClubMember(name, isMe=false) {
    let member = {},
        x = 0, y = 0, vy = 0, isFalling = true
    const maxVel = 2, scale = 50, border = 2, timeIncr = 0.025

    const color = isMe ? 0x009E60 : 0xFF9E9E

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
    jump = (magnitude) => {
      if (! isFalling){
        isFalling = true
        vy = -magnitude
      }
    },
    updatePosition = () => {
      const gravity = -2

      //from key presses
      if (state.right) move(maxVel)
      if (state.left) move(-maxVel)
      if (state.up) jump(7)

      vy -= 0.1 * gravity
      //gravity
      y += vy + -0.5 * gravity

      //wall collisions
      const maxWidth = local.canvasWidth - scale - border,
      maxHeight = local.canvasHeight - scale - border
      if (x > maxWidth) x = maxWidth
      else if (x < border) x = border
      if (y > maxHeight){
        y = maxHeight
        isFalling = false
        vy = 0
      }
      else if (y < border) y = border

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

    member.update = () => {
      let dx = (x - graphics.x),
      dy = (y - graphics.y)
      let smoothness
      if (isMe) {
        updatePosition()
        smoothness = 0.8
      }else{
        smoothness = 0.1
      }
      graphics.x += dx * smoothness
      graphics.y += dy * smoothness
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
