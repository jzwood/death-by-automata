"use strict";

//necessary globals
let canvasWidth, canvasHeight,
createCanvas, background, frameRate,
fill, quad, fleet

//P5 calls setup once as an initialization step
function setup(){
	canvasWidth = 640, canvasHeight = 480
	let sketch =  createCanvas(canvasWidth, canvasHeight).parent('sketch-container')
	frameRate(10)
	fleet = new Map()
}

//P5 loops draw() as mechanism of animation
function draw() {
	background('#ECEEFB')
	for (let ship of fleet.values()) {
		ship.update()
	}
}

function initShip(id,data){
	console.log("////////////////////////////////////////////////////////")
	var color = (socket.id === id)? '#009E60' : '#FF9E9E';
	let ship = newShip(id,color)
	ship.setProps(data)
	fleet.set(id, ship)
}

function updateShip(id,data){
	console.log("========================================================")
	let ship = fleet.get(id)
	ship.setProps(data)
}

//module pattern "ship" constructor
function newShip(name,color) {
    let newShip = {},
        x = 0, y = 0, v = 2, r = 0
		const scale = 15

		let drawSelf = function(){
	    fill(color)

	    const wingAngle = Math.PI*3/4

	    quad(x+0.75*scale*Math.cos(r), y+0.75*scale*Math.sin(r),
		    x+scale*Math.cos(r-wingAngle), y+scale*Math.sin(r-wingAngle),
		    x-0.5*scale*Math.cos(r), y-0.5*scale*Math.sin(r),
		    x+scale*Math.cos(r+wingAngle), y+scale*Math.sin(r+wingAngle))
	  }

		newShip.getProps = function(){
			return {'x':x,'y':y,'r':r}
		}

		newShip.setProps = function(data) {
			x = data.x; y = data.y; r = data.r
		}

		newShip.update = function(){
				x = mod(x + v * Math.cos(r), canvasWidth)
		    y = mod(y + v * Math.sin(r), canvasHeight)
		    drawSelf()
		}
    return newShip
}
