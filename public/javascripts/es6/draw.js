let MainLoop = declareWeak(window.MainLoop),
background = declareWeak(window.background),
createCanvas = declareWeak(window.createCanvas)

let io =  declareWeak(window.io)

//local "globals" populate this POJO
let local

function setup() {
  const size = 645
  let gridSize = 15

  while(size%gridSize !== 0){
    gridSize++
  }
  console.log('gridSize',gridSize)

  let canvas = createCanvas(640, 640)
  canvas.parent('wrapper__canvas')
  canvas.class('wrapper__canvas__p5')

  console.log('waiting for network connection')
  let waitForNetwork = window.setInterval(()=>{
    console.count('attempts')
    if(io){
      console.log('network connected')
      start(size,gridSize)
      clearInterval(waitForNetwork)
    }
  },100)
}

function start(s,g){

  const isPrivate = location.href.indexOf('/private')
  let socket = isPrivate > 0 ? io('/private') : io('/public')

  local = {
    canvasWidth: s,
    canvasHeight: s,
    environment: newEnvironment(g),
    sock: socket,
    clubHouse: newClubHouse()
  }


  connectToServer(socket)
  // run game
  MainLoop.setMaxAllowedFPS(60).setUpdate(update).setDraw(paint).setEnd(end).start()
}

function update(delta){
  local.clubHouse.update(delta)
}

function paint(interpolationPercentage){
  local.environment.updateGraphics(interpolationPercentage)
}

function draw(){}
