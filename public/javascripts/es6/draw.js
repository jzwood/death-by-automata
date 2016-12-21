var io, socket

let p5App = new window.p5(app)

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
        window.clearInterval(waitForNetwork)
      }
    },100)
  }

  function start(){
    const isPrivate = location.href.indexOf('/private')
    socket = isPrivate > 0 ? io('/private') : io('/public')
    //hopefully alerts the server which room socket should join
    const room = window.location.pathname.slice(-40)
    socket.emit('init',room)
    socket.on('updateBoard', board => {
      controller.update(board)
    })
    addKeyPressListener(socket,room,controller.onEnter)
  }

  //p5 calls draw (animation loop) automatically
  p.draw = () => {
    controller.animate()
  }
}

function addKeyPressListener(s,r,callback){
  const timePerCall = 500
  document.addEventListener('keydown', function(event) {
    event.preventDefault()
    throttle(callback(s,r,event.keyCode),timePerCall)
 }, false)
}

function throttle(func, ms){
	var last = 0;
	return function(){
		var a = arguments, t = this, now = +(new Date);
		//b/c last = 0 will still run the first time called
		if(now >= last + ms){
			last = now;
			func.apply(t, a);
		}
	}
}
