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

function assignKeys(p){
	let left = keyboard(37),
			up = keyboard(38),
			right = keyboard(39),
			down = keyboard(40)

	left.press = () => { p.left = true; }
	left.release = () => { p.left = false; }
	right.press = () => { p.right = true; }
	right.release = () => { p.right = false; }
	up.press = () => { p.up = true; }
	up.release = () => { p.up = false; }
	down.press = () => { p.down = true; }
	down.release = () => { p.down = false; }
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


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout
	return function() {
		var context = this, args = arguments
		var later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}
		var callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
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
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  )
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  )
  return key
}
