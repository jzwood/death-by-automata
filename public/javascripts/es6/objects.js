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
    const maxVel = 2, accel = 0.1, scale = 50

    const color = isMe ? 0x009E60 : 0xFF9E9E

		let graphics = new PIXI.Graphics()
    let drawSelf = (() => {
      // set a fill and line style
      graphics.beginFill(color)
      graphics.lineStyle(4, 0xcccccc, 1)
      // draw a shape
      graphics.moveTo(0, scale)
      graphics.lineTo(scale, scale)
      graphics.lineTo(scale, 0)
      graphics.lineTo(0, 0)
      graphics.lineTo(0, scale)
      graphics.endFill()
      stage.addChild(graphics)
      member.graphics = graphics //store in member object
    })()

    if (isMe){
      let left = keyboard(37),
          up = keyboard(38),
          right = keyboard(39),
          down = keyboard(40)

      let move = (vel,vertical) => {
        friction = 1
        // vx = Math.min(Math.max(vx + vel,-maxVel),maxVel)
        vertical ? x += vel : y += vel
      }

      left.press = () => {
        move(-maxVel,true)
      }
      right.press = () => {
        move(maxVel,true)
      }

      up.press = () => {
        move(-maxVel,false)
      }
      down.press = () => {
        move(maxVel,false)
      }

      // // Left arrow key `release` method
      // left.release = () => {
      //   if (!right.isDown) {
      //     friction = 0.99
      //   }
      // }
    }

    member.update = () => {
      // x += vx
      // vx *= friction
      graphics.x = x
      graphics.y = y
    }

    // newShip.rotate = (angle, isDeg = false) => { if (isDeg) { angle *= Math.PI / 180 } r += angle }
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
