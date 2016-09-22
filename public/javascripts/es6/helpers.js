//The algorithm below returns the positive mod value, cuz javascript doesn't do smart %
let mod = function(val, base){
			let temp = val%base
			while (temp < 0){
					temp += base
			}
			return temp
}
