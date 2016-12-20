module.exports = {

  'controller': function() {
    var dim = 20,
    board = [],
    dimSquared = dim * dim
    board.length = dimSquared
    board.fill(0)

    var boardTemp = []
    boardTemp.length = dimSquared
    boardTemp.fill(0)

    var colors = ['#ff0000','#ff00ff','#00ffff','#00ff00','#ffff00']

    function getSquare(i,dx,dy) {
      return (acceptableIndex(index % dim + dx, dim) &&
              acceptableIndex(index + dy * dim, dimSquared)) ?
              board[index + dx + dy * dim] : 0
    }

    function getIndices(i){
      return [
        getSquare(i,-1,-1,d), getSquare(i,1,-1,d),
        getSquare(i,0,-1,d), getSquare(i,-1,0,d),
        getSquare(i,1,0,d), getSquare(i,-1,1,d),
        getSquare(i,0,1,d), getSquare(i,1,1,d)
      ]
    }

    return {
      updateAutomata : function(rules) {
        for (var i = 0; i < dimSquared; i++) {
          var indices = getIndices(i)
          var newIndexValue = parseSB(rules,indices)
          boardTemp[i] = newIndexValue
        }
        board = boardTemp.slice(0) //cloning boardTemp
      }
    },
    getBoard : function(){
      return board
    }

  }
}

function parseSB(rs, str){
  for(var i=0, n=rs.length; i<n; i++){

  }
}

function acceptableIndex(i,n) { return i >= 0 && i < n }
