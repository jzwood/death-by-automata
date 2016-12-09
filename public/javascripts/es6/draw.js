"use strict";

let PIXI, Container, autoDetectRenderer, stage, renderer, loader

let MainLoop = declareWeak(window.MainLoop)

//local "globals" populate this POJO
let local

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed")
  setup()
})

function setup() {
  const width = 800, height = 600
  //Aliases
  Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  stage = new Container(),
  renderer = autoDetectRenderer(width, height, {
    antialiasing: false,
    transparent: false,
    backgroundColor: 0x1099bb,
    resolution: 1
  })

  document.querySelector('.wrapper__canvas').appendChild(renderer.view)
  local = {
    canvasWidth: width,
    canvasHeight: height,
    clubHouse: newClubHouse(),
    dividerLine: drawZones(width, height)
  }

  // run game
  MainLoop.setMaxAllowedFPS(60).setUpdate(update).setDraw(draw).start()
}

function update(delta){
  local.clubHouse.update(delta)
}

function draw(interpolationPercentage){
  renderer.render(stage)
}
