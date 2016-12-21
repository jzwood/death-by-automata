//The algorithm below returns the positive mod value, cuz javascript doesn't do smart %
function mod(val, base){
			let temp = val%base
			while (temp < 0){
					temp += base
			}
			return temp
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
