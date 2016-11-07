"use strict";

let PIXI, Container, autoDetectRenderer, stage, renderer, loader

//local "globals" will populate this POJO
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

  document.body.appendChild(renderer.view)
  local = {
    canvasWidth: width,
    canvasHeight: height,
    clubHouse: newClubHouse()
  }
  draw()
}

function draw() {
  requestAnimationFrame(draw)
  local.clubHouse.update()
  renderer.render(stage)
}
