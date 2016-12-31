var io, socket

let p5App = new window.p5(app)

function app(p){

  const size = 500
  let controller = newController(size,p)

  //p5 calls setup automatically (once)
  p.setup = () => {
    //inserts canvas in DOM
    let canvas = p.createCanvas(size + 1, size + 1)
    canvas.parent('wrapper__canvas')
    canvas.class('wrapper__canvas__p5')

    //attempts to connect to server
    console.log('waiting for network connection')
    let waitForNetwork = window.setInterval(() => {
      console.count('connection attempts')
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

    p.noStroke()
    // p.stroke('#363636')
    p.stroke('#111111')
    p.strokeWeight(1)
    p.strokeCap(p.SQUARE)


    socket.emit('init',room)

    socket.on('updateBoard', board => {
      controller.update(board)
    })

    socket.on('removeInputfield', warning => {
      document.querySelector('.wrapper__terminal').remove()
      document.querySelector('.warning').textContent = warning
    })

    addKeyPressListener(socket,room,controller.onEnter)
  }

  //p5 calls draw (animation loop) automatically
  p.draw = () => {
    p.background("#cccccc")
    controller.animate()
  }
}

function addKeyPressListener(s,r,callback){
  const timePerCall = 500
  document.addEventListener('keydown', function(event) {
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
