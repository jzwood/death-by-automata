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
        x = 0, y = 0, vx = 0, vy = 0, friction = 0
    const maxVel = 2, accel = 0.1, scale = 50, border = 2

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

    let state = {'up':false,'down':false,'left':false,'right':false, 'time':0},
    move = (vel,vertical) => {
      friction = 1
      vertical ? x += vel : y += vel
    },
    updatePosition = () => {
      if (state.right) move(maxVel,true)
      if (state.left) move(-maxVel,true)
      if (state.down) move(maxVel,false)
      if (state.up) move(-maxVel,false)

      //gravity


      //wall collisions
      if (x > local.canvasWidth - scale - border) x = local.canvasWidth - scale - border;
      else if (x < border) x = border;
      if (y > local.canvasHeight - scale - border) y = local.canvasHeight - scale - border;
      else if (y < border) y = border;


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
      if (isMe) {
        updatePosition()
        graphics.x = x
        graphics.y = y
      }else{
        const smoothness = 0.1
        let dx = (x - graphics.x) * smoothness,
        dy = (y - graphics.y) * smoothness

        graphics.x += dx
        graphics.y += dy
      }
    }

    member.getProps = () => {
        return {
            'x': x, 'y': y, 'vx': vx, 'vy': vy
        }
    }

    member.setProps = data => {
        x = data.x; y = data.y; vx = data.vx; vy = data.vy
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
