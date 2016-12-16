var io, socket


let p5App = new p5(app)

function app(p){

  const size = 700, grid = 25
  let controller = newController(size),
  user = newUser()
  //p5 calls setup automatically (once)
  p.setup = () => {
    //initial grid dimensions
    console.assert(size%grid === 0)

    //inserts canvas in DOM
    let canvas = p.createCanvas(size, size)
    canvas.parent('wrapper__canvas')
    canvas.class('wrapper__canvas__p5')

    //attempts to connect to server
    console.log('waiting for network connection')
    let waitForNetwork = window.setInterval(() => {
      console.count('attempts')
      if(io){
        console.log('network connected')
        start()
        clearInterval(waitForNetwork)
      }
    },100)
  }

  function start(){
    const isPrivate = location.href.indexOf('/private')
    socket = isPrivate > 0 ? io('/private') : io('/public')
    connectToServer(socket,collection)
  }

  //p5 calls draw (animation loop) automatically
  p.draw = () => {
    controller.draw()
  }
}
