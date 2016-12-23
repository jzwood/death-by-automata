"use strict";

module.exports = {

  controller: function(){
    var dim = 50,
    board = [],
    dimSquared = dim * dim
    board.length = dimSquared
    board.fill(0)

    var boardTemp = []
    boardTemp.length = dimSquared
    boardTemp.fill(0)

    var t = 0
    for(var i=0; i<dimSquared; i++){
      // boardTemp[i] = ~~(Math.random() * 1.2)
      board[i] = ~~(Math.random() * 2)
      if(board[i] === 1) t++
    }
    console.log(t/dimSquared)

    var playerData = {}

    function getSquare(i,dx,dy) {
      return (acceptableIndex(i % dim + dx, dim) &&
              acceptableIndex(i + dy * dim, dimSquared)) ?
              board[i + dx + dy * dim] : 0
    }

    function getIndices(i){
      return [
        getSquare(i,-1,-1), getSquare(i,1,-1),
        getSquare(i,0,-1), getSquare(i,-1,0),
        getSquare(i,1,0), getSquare(i,-1,1),
        getSquare(i,0,1), getSquare(i,1,1)
      ]
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
          // board[i] = newIndex
        }
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

    // var sb = users[i].rule.split('/')
    var sb = '12345/3'.split('/')
    // console.log(neighbors,users)
    var living = neighbors[users[i].color]

    if ((index && sb[0].indexOf(living)+1) || (!index && sb[1].indexOf(living)+1)){
      proposals.push(users[i].color)
    }else{
      proposals.push(0)
    }
  }
  return proposals.length === 0 ? 0 : (
    proposals.length === 1 ? proposals.pop() : 5
  )
}

function acceptableIndex(i,n) { return i >= 0 && i < n }