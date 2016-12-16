var background, createCanvas, io
//local "globals" populate this POJO
let local

function setup() {
  const size = 700
  let grid = 25

  while(size%grid !== 0){
    grid++
  }
  console.log('grid',grid)

  let canvas = createCanvas(size, size)

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

  local = { }


  connectToServer(socket)
  // run game
}

function update(delta){
  local.environment.updateAutomata(delta)
  local.environment.updateGraphics(delta)
}

function paint(interpolationPercentage){
  local.clubHouse.update(interpolationPercentage)
}

function draw(){

}
