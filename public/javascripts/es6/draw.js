"use strict";

//necessary globals
let canvasWidth, canvasHeight,
createCanvas, background, frameRate,
fill, quad, fleet = new Map()

//P5 calls setup once as an initialization step
function setup(){
	canvasWidth = 640, canvasHeight = 480
	let sketch =  createCanvas(canvasWidth, canvasHeight).parent('sketch-container')
	frameRate(10)
}

//P5 loops draw() as mechanism of animation
function draw() {
	background('#ECEEFB')
	for (let [shipid, ship] of fleet) {
		ship.update()
	}
}

function syncUsers(store){
	
}

function initShip(id){
	let shipA = newShip(id,'#FF9E9E')
	fleet.set(id, shipA)
}

//module pattern "ship" constructor
function newShip(name,color) {
    let newShip = {'name':name},
        x = 100, y = 100, v = 2, r = Math.PI/3
		const scale = 15

		let drawSelf = function(){
	    fill(color)

	    const wingAngle = Math.PI*3/4

	    quad(x+0.75*scale*Math.cos(r), y+0.75*scale*Math.sin(r),
		    x+scale*Math.cos(r-wingAngle), y+scale*Math.sin(r-wingAngle),
		    x-0.5*scale*Math.cos(r), y-0.5*scale*Math.sin(r),
		    x+scale*Math.cos(r+wingAngle), y+scale*Math.sin(r+wingAngle))
	  }

		newShip.rotate = function(angle) { r += angle; }
		newShip.update = function(){
				x = mod(x + v * Math.cos(r), canvasWidth)
		    y = mod(y + v * Math.sin(r), canvasHeight)
		    drawSelf()
		}
    return newShip
}
