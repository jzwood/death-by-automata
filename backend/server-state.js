"use strict";

module.exports = {

  controller: function(){
    var dim = 75,
    board = [],
    dimSquared = dim * dim
    board.length = dimSquared
    board.fill(0)

    var boardTemp = []
    boardTemp.length = dimSquared
    boardTemp.fill(0)

    var playerData = {}

    function isInBoard(i,dx,dy){
      return acceptableIndex(i % dim + dx, dim) && acceptableIndex(i + dy * dim, dimSquared)
    }

    function getSquare(i,dx,dy) {
      return isInBoard(i,dx,dy) ? board[i + dx + dy * dim] : 0
    }

    function getIndex(i,dx,dy) {
      return isInBoard(i,dx,dy) ? i + dx + dy * dim : 0
    }

    function getIndices(i){
      return [
        getSquare(i,-1,-1), getSquare(i,1,-1),
        getSquare(i,0,-1), getSquare(i,-1,0),
        getSquare(i,1,0), getSquare(i,-1,1),
        getSquare(i,0,1), getSquare(i,1,1)
      ]
    }

    function poison(){
      var visited = []
      visited.length = dimSquared
      visited.fill(0)
      visited = visited.map(function(v,j){
        return j%dim && (j+1)%dim && j > dim && j < (dimSquared - dim) ? 0 : 1
      })
      for (var i = 0; i < dimSquared; i++) {
        if(boardTemp[i] === 5)
        recursivelyPoison(i,visited)
      }
    }

    function recursivelyPoison(k,visited){
      if(!visited[k]){
        visited[k] = 1
        if(boardTemp[k]){
          boardTemp[k] = 5
          recursivelyPoison(getIndex(k,1,-1),visited)
          recursivelyPoison(getIndex(k,1,0),visited)
          recursivelyPoison(getIndex(k,1,1),visited)
          recursivelyPoison(getIndex(k,0,-1),visited)
          recursivelyPoison(getIndex(k,0,1),visited)
          recursivelyPoison(getIndex(k,-1,-1),visited)
          recursivelyPoison(getIndex(k,-1,0),visited)
          recursivelyPoison(getIndex(k,-1,1),visited)
        }
      }return false
    }

    return {
      setRules: function(id,rule){
        playerData[id] = playerData[id] || {}
        playerData[id].rule = rule
      },
      setColor: function(id,color){
        playerData[id] = playerData[id] || {}
        playerData[id].color = color
      },
      whackPlayer: function(id){
        delete playerData[id]
        return Object.keys(playerData).length
      },
      getPlayerData: function(){
        return playerData
      },
      decommission: function(){ //attempting memory leak protection
        board = void(0)
        boardTemp = void(0)
        playerData = void(0)
      },
      getBoard: function(){
        return board
      },
      updateAutomata: function(){
        for (var i = 0; i < dimSquared; i++) {
          var indices = getIndices(i)
          var index = board[i]
          var newIndex = getNewIndex(playerData, index, indices)
          // if (newIndex) boardTemp[i] = newIndex
          boardTemp[i] = newIndex
        }
        poison()
        //four corners
        boardTemp[0] = 1
        boardTemp[dim - 1] = 2
        boardTemp[dimSquared - dim] = 3
        boardTemp[dimSquared - 1] = 4

        board = boardTemp.slice(0) //cloning boardTemp
      }
    }
  }
}

function countArray(a){
  var out = {}
  for(var i=0, n=a.length; i<n; i++){
    if(!out[a[i]]) out[a[i]] = 0
    out[a[i]]++
  }return out
}


function getNewIndex(playerData, index, indices){
  var users = Object.keys(playerData).map(function(key) {
    return playerData[key]
  })
  var neighbors = countArray(indices)
  var proposals = []

  for(var i=0, n=users.length; i<n; i++){

    var sb = users[i].rule.split('/')

    if(sb.length >= 2){
      var living = neighbors[users[i].color]
      if ((index && sb[0].indexOf(living)+1) || (!index && sb[1].indexOf(living)+1)){
        proposals.push(users[i].color)
      }else{
        proposals.push(0)
      }
    }
  }
  proposals = proposals.filter(function(val){
    return val > 0
  })

  return proposals.length === 0 ? 0 : (
    proposals.length === 1 ? proposals.pop() : 5
  )

  return [0,proposals.slice(-1),5,5,5][proposals.length]
}

function acceptableIndex(i,n) { return i >= 0 && i < n }
