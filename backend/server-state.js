"use strict";

module.exports = {

  controller: function(){
    var dim = 20,
    board = [],
    dimSquared = dim * dim
    board.length = dimSquared
    board.fill(0)

    var boardTemp = []
    boardTemp.length = dimSquared
    boardTemp.fill(0)

    var playerData = {}

    function getSquare(i,dx,dy) {
      return (acceptableIndex(index % dim + dx, dim) &&
              acceptableIndex(index + dy * dim, dimSquared)) ?
              board[index + dx + dy * dim] : 0
    }

    function getIndices(i){
      return [
        getSquare(i,-1,-1), getSquare(i,1,-1),
        getSquare(i,0,-1), getSquare(i,-1,0),
        getSquare(i,1,0), getSquare(i,-1,1),
        getSquare(i,0,1), getSquare(i,1,1)
      ]
    }

    function updateAutomata(){
      for (var i = 0; i < dimSquared; i++) {
        var neighbors = getIndices(i)
        var index = board[i]
        boardTemp[i] = getNewIndex(rules,index,neighors)
      }
      board = boardTemp.slice(0) //cloning boardTemp
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
      }
    }
  }
}

function countArray(a){
  out = {}
  for(var i=0, n=a.length; i<n; i++){
      if(!out[a[i]]) out[a[i]] = 0
      out[a[i]]++
  }return out
}


function getNewIndex(rules, index, neighbors){
  var users = Object.values(rs)
  var neighbors = countArray(inds)
  var proposals = []
  for(var i=0, n=users.length; i<n; i++){
    var sb = str.split('/')
    var living = neighbors[users[i].color]
    if ((index && sb[0].indexOf(living)+1) || (!index && sb[1].indexOf(living)+1)){
      proposals.push(users[i].color)
    }
  }
  return proposals.length === 0 ? 0 : (
    proposals.length === 1 ? proposals.pop() : 5
  )
}

function acceptableIndex(i,n) { return i >= 0 && i < n }
