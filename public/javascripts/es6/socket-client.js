"use strict";

var io,
isConnected = false,
socket = (function(){
  var isPrivate = location.href.indexOf('/private')
  return isPrivate > 0 ? io('/private') : io('/public')
})()

socket.on('init', function(store){
  if(!isConnected){
    isConnected = true
    initSocketListener(store.ids)
  }
  syncUsers(store)
})

// Should only be called once
function initSocketListener(ids){
  socket.on(ids.userInput, function(data){  })
  socket.on(ids.newRoom, function(data){  })
  socket.on(ids.disconnect, function(data){  })
}

function onConnect(data){

}

function onInput(data){

}

function onNewRoom(data){

}

// function addFormListener(form, socket){
//   form.addEventListener('submit',function(e){
//     e.preventDefault();
//     let m = document.querySelector('#m')
//
//     socket.emit(msgId, m.value)
//
//     appendMsg(m.value)
//     m.value = ''
//     return false
//   }, false)
// }

// function appendMsg(msg){
//   let temp = document.querySelector('.template').content
//   temp.querySelector('li').textContent = msg
//   let clone = document.importNode(temp, true)
//   let messages = document.querySelector('#messages')
//   messages.appendChild(clone)
//   return false
// }
