// Stores Environment Data
function newEnvironment(dimensions){
  let board = [],
  arrLen = dimensions * dimensions
  board.length = arrLen
  board.fill(0)

  const colors = {
   -1: 0xFF0000, // Warning
    0: 0xffffff,
    1: 0x000000,
    2: 0xC2DAF5,
    3: 0xDBFFE2
  }

  const scale = 70, border = 2

  return {
    size: dimensions,
    getSquare(x,y){
      let index = x + dimensions * y
      return acceptableIndex(index) ? (
        board[x + dimensions * y]
      ):(
        console.warn('Index',index,'out of range. getSquare(',x,y,') failed.'),
        -1
      )
    },
    setSquare(x,y,v){
      let index = x + dimensions * y
      acceptableIndex(index) ? (
        board[index] = v
      ):(
        console.warn('Index',index,'out of range. setSquare(',x,y,v,') failed.'),
      )
    },
    updateGraphics(){
      for(let i = 0; i<arrLen; i++){
        window.fill(colors[board[i]])
        window.rect(scale * (i%arrLen), scale * ~~i/arrLen,scale,scale)
      }
    }
  }
}
