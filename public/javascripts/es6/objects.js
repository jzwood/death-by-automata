"use strict";

/*
Object Factory
*/

function newClubHouse() {
    const clubHouse = {
        map: new Map()
    }
    clubHouse.update = () => {
        for (let member of this.map.values()) {
            member.update()
        }
    }
    return clubHouse
}

function newClubMember(name, color=0x000000) {
    let member = {},
        x = 0, y = 0, vx = 1, vy = 0
    const scale = 15

		let graphics = new PIXI.Graphics()
    let drawSelf = (() => {
      // set a fill and line style
      graphics.beginFill(color)
      graphics.lineStyle(4, 0xcccccc, 1)

      // draw a shape
      graphics.moveTo(0, scale)
      graphics.moveTo(0, scale)
      graphics.lineTo(scale, scale)
      graphics.lineTo(0, scale)
      graphics.lineTo(scale, 0)
      graphics.endFill()
    })()

    let left = keyboard(37),
        right = keyboard(39)

    left.press = () => {
      vx = -5; vy = 0
    };
    //Left arrow key `release` method
    left.release = () => {
      if (!right.isDown && vy === 0) {
        vx = 0
      }
    };

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
    // var color = (socket.id === id) ? 0x009E60 : 0xFF9E9E
    var color = 0x009E60
    let member = newClubMember(id, color)
    member.setProps(data)
    local.clubHouse.set(id, member)
}

function updateMember(id, data) {
    let member = local.clubHouse.get(id)
    member.setProps(data)
}
