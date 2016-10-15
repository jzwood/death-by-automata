"use strict";

function initShip(id,data){
	var color = (socket.id === id)? '#009E60' : '#FF9E9E';
	let ship = newShip(id,color)
	ship.setProps(data)
	local.fleet.set(id, ship)
}

function updateShip(id,data){
	let ship = local.fleet.get(id)
	ship.setProps(data)
}

//module pattern "ship" constructor
function newShip(name,color) {
    let newShip = {},
        x = 0, y = 0, v = 2, r = 0
		const scale = 15

		let drawSelf = () => {
	    fill(color)

	    const wingAngle = Math.PI*3/4

	    quad(x+0.75*scale*Math.cos(r), y+0.75*scale*Math.sin(r),
		    x+scale*Math.cos(r-wingAngle), y+scale*Math.sin(r-wingAngle),
		    x-0.5*scale*Math.cos(r), y-0.5*scale*Math.sin(r),
		    x+scale*Math.cos(r+wingAngle), y+scale*Math.sin(r+wingAngle))
	  }

		newShip.rotate = (angle,isDeg=false) => {
			if(isDeg){
				angle *= Math.PI / 180
			}
			r += angle
		}

		newShip.getProps = () => {
			return {'x':x,'y':y,'r':r}
		}

		newShip.setProps = data => {
			x = data.x; y = data.y; r = data.r
		}

		newShip.update = () => {
				x = mod(x + v * Math.cos(r), canvasWidth)
		    y = mod(y + v * Math.sin(r), canvasHeight)
		    drawSelf()
		}
    return newShip
}
