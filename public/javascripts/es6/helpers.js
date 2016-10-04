//The algorithm below returns the positive mod value, cuz javascript doesn't do smart %
function mod(val, base){
			let temp = val%base
			while (temp < 0){
					temp += base
			}
			return temp
}

document.addEventListener('keyup', (event) => {
 local.isUp = true
}, false)

document.addEventListener('keydown', (event) => {
	if(local.isUp){
		local.isUp = false
	  const keyName = event.key;
	  if(keyName === 'ArrowLeft'){
			local.fleet.get(local.me).rotate(-10,true)
		}else if( keyName === 'ArrowRight'){
			local.fleet.get(local.me).rotate(10,true)
		}
	}
}, false)
