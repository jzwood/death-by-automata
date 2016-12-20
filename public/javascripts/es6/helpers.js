//The algorithm below returns the positive mod value, cuz javascript doesn't do smart %
function mod(val, base){
			let temp = val%base
			while (temp < 0){
					temp += base
			}
			return temp
}

function IIFE(fnx){
	fnx()
}

function acceptableIndex(i,n) {
	return i >= 0 && i < n
}

function getSquare(i,dx,dy,dim) {
	let index = i
	const xdisp = index % dim + dx
	if(acceptableIndex(xdisp, dim)){
		index += dx
	} else {
		return 0
	}
	const ydisp = index + dy * dim
	if(acceptableIndex(ydisp, dim*dim)){
		index = ydisp
	} else {
		return 0
	}
	return index
}

function isMyId(id) {
	if(local.sock.id){
		return id === local.sock.id
	}else{
		console.warn('local.sock.id not set')
		return false
	}
}

/**
 * Updates the FPS counter.
 *
 * @param {Number} fps
 *   The smoothed frames per second.
 * @param {Boolean} panic
 *   Whether the main loop panicked because the simulation fell too far behind
 *   real time.
 */
function end(fps, panic) {
  if (panic) {
    var discardedTime = Math.round(MainLoop.resetFrameDelta());
    console.warn('Main loop panicked, probably because the browser tab was put in the background. Discarding ' + discardedTime + 'ms');
  }
}

//The `keyboard` helper function
function keyboard(keyCode) {
  var key = {}
  key.code = keyCode
  key.isDown = false
  key.isUp = true
  key.press = undefined
  key.release = undefined
  //The `downHandler`
  key.downHandler = (event) => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press()
      key.isDown = true
      key.isUp = false
    }
    event.preventDefault()
  }
  //The `upHandler`
  key.upHandler = (event) => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release()
      key.isDown = false
      key.isUp = true
    }
    event.preventDefault()
  }
  //Attach event listeners
  window.addEventListener( "keydown", key.downHandler.bind(key), false )
  window.addEventListener( "keyup", key.upHandler.bind(key), false )
  return key
}

function assignKeys(p){
	let enter = keyboard(13)

	enter.press = () => { p.left = true; }
	enter.release = () => { p.left = false; }
}

function declareWeak(val){
	return (typeof val === 'undefined') ? undefined : val
}

function declareWeakArray(arr){
	for(var i=0, n=arr.length; i<n; i++){
		var globalItem = window[arr[i]]
		globalItem = (typeof globalItem === 'undefined') ? undefined : globalItem
	}
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
