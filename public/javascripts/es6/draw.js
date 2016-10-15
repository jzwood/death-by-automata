"use strict";

//necessary evils I mean globals (p5)
let canvasWidth, canvasHeight,
createCanvas, background, frameRate,
fill, quad
//local "globals" will populate this
let local

//P5 calls setup once as an initialization step
function setup(){
	canvasWidth = 640, canvasHeight = 480
	let sketch =  createCanvas(canvasWidth, canvasHeight).parent('sketch-container')
	frameRate(10)
	local = {fleet: new Map(), isUp: false}
}

//P5 loops draw() as mechanism of animation
function draw() {
	background('#ffffff')
	for (let ship of local.fleet.values()) {
		ship.update()
	}
}
