"use strict";

//necessary globals
let fleet, canvasWidth, canvasHeight,
createCanvas, background, frameRate, fill, quad;

function setup(){

	canvasWidth = 640, canvasHeight = 480, 	fleet = []

	let sketch =  createCanvas(canvasWidth, canvasHeight)
  		.parent('sketch-container')

	frameRate(10)

}

function draw() {
	background('#ECEEFB')
	for (let ship of fleet) {
		ship.update()
	}
}

//The algorithm below returns the positive mod value, cuz javascript doesn't do smart %
let mod = function(val, base){
			let temp = val%base
			while (temp < 0){
					temp += base
			}
			return temp
}

function initShip(socket){
	let shipA = newShip(socket.id,'#FF9E9E')
	fleet.push(shipA)
}

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
