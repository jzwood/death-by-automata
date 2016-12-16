// Stores Environment Data
function newEnvironment(dimensions){
  let board = [],
  arrLen = dimensions * dimensions
  board.length = arrLen
  board.fill(0)

  let boardTemp = []
  boardTemp.length = arrLen
  boardTemp.fill(0)

  const colors = {
      0: '#000000', //death
      1: '#C2DAF5', //player 2
      2: '#DBFFE2',
      3: '#ffffff'
  }

  const scale = 70, border = 2

  return {
    size: dimensions,
    setSquareIndex(i,v){
      acceptableIndex(i,arrLen) ? (
        boardTemp[i] = v
      ) : (
        console.warn('Index',i,'out of range. setSquareIndex(',i,') failed.')
      )
    },
    updateGraphics(){
      window.background("#cccccc")
      window.noStroke()
      const edge = 0.25
      for(let i = 0; i<arrLen; i++){
        board[i] = boardTemp[i]
        window.fill(colors[board[i]])
        let w = local.canvasWidth / dimensions
        let h = local.canvasHeight / dimensions
        window.rect(w * (i%dimensions), h * ~~(i/dimensions), h-edge, w-edge)
      }
    },
    updateAutomata(){
      for(let i = 0; i<arrLen; i++){
        let indices = getIndices(i,dimensions)
        let zero = 0, one = 0, two = 0
        for(let j of indices){
          if(j === 0){
            zero++
          }else if(j === 1){
            one++
          }else if(j === 2){
            two++
          }
        }

        const living = one + two, dead = zero
        if(board[i]){
          if(living < 2){
            boardTemp[i] = 0
          }else if(living === 2 || living === 3){
            if(one > two){
              boardTemp[1] = 1
            }else if(one < two){
              boardTemp[1] = 2
            }
          }else{
            boardTemp[i] = 0
          }
        }else{
          if(living === 3){
            if(one > two){
              boardTemp[1] = 1
            }else if(one < two){
              boardTemp[1] = 2
            }else{
              console.error('impossible state reached')
            }
          }
        }
      }
    }
  }
}
