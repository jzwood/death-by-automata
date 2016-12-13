"use strict";

let MainLoop = declareWeak(window.MainLoop)

//local "globals" populate this POJO
let local

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed")
  setup()
})

function setup() {
  const width = 600, height = 600, gridSize = 15

  document.querySelector('.wrapper__canvas').appendChild(renderer.view)
  local = {
    canvasWidth: width,
    canvasHeight: height,
    environment: newEnvironment(gridSize)
    // , clubHouse: newClubHouse()
  }


  // run game
  MainLoop.setMaxAllowedFPS(60).setUpdate(update).setDraw(paint).start()
}

function update(delta){
  local.clubHouse.update(delta)
  local.environment.updateGraphics(delta)
}

function paint(interpolationPercentage){
  background(0xcccccc)
}
